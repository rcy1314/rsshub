import requests
from meilisearch import Client


class MeiliSearchHelper:
    def __init__(self, base_url, api_key):
        self.base_url = base_url
        self.meilisearch_client = Client(base_url, api_key)
        self.meilisearch_index = self.meilisearch_client.index('rsshub-tmp')

    def delete_index(self):
        response = requests.delete(f"{self.base_url}/indexes/{self.uid}")
        return response.status_code == 204
