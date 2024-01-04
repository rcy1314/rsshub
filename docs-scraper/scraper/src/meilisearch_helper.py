from requests.exceptions import MissingSchema


class MeiliSearchHelper:
    def __init__(self, base_url, api_key):
        if not base_url.startswith(('http://', 'https://')):
            base_url = 'http://' + base_url
        self.meilisearch_index = MeiliSearch(base_url, api_key)

    def delete_index(self):
        try:
            self.meilisearch_index.delete()
        except MissingSchema as e:
            print(f"Error deleting index: {e}. Invalid base URL: {self.meilisearch_index.base_url}")
