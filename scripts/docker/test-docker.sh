#!/bin/bash

MAX_RETRIES=12
# Try running the docker and get the output
# then try getting homepage in 1 minute

docker run -d -p 1200:1200 -e MEILI_HTTP_URL=http://correct-meilisearch-instance:7700 rsshub:latest

if [[ $? -ne 0 ]]
then
    echo "failed to run docker"
    exit 1
curl -m 10 -e MEILI_HTTP_URL=http://correct-meilisearch-instance:7700 localhost:1200

RETRY=1
curl -m 10 -e MEILI_HTTP_URL=http://correct-meilisearch-instance:7700 localhost:1200
while [[ $? -ne 0 ]] && [[ $RETRY -lt $MAX_RETRIES ]]; do
    sleep 5
    ((RETRY++))
    echo "RETRY: ${RETRY}"
    curl -m 10 -e MEILI_HTTP_URL=http://correct-meilisearch-instance:7700 localhost:1200
done

if [[ $RETRY -ge $MAX_RETRIES ]]
then
    echo "Unable to run, aborted"
    exit 1
else
    echo "Successfully acquire homepage, passing"
    exit 0
fi
