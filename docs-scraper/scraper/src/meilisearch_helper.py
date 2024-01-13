# docs-scraper/scraper/src/meilisearch_helper.py

class MeiliSearchHelper:
    def __init__(self, uid):
        self.uid = uid
        self.meilisearch_index = MeiliSearchIndex(uid)

    def delete_index(self):
        self.meilisearch_index.delete(url='https:///indexes/' + self.uid)
