import requests

GRAPHQL_URL = "https://leetcode.com/graphql"


class LeetCodeClient:

    def __init__(self):
        self.url = GRAPHQL_URL

    def query(self, query, variables):

        response = requests.post(
            self.url,
            json={
                "query": query,
                "variables": variables
            },
            headers={
                "Content-Type": "application/json"
            }
        )

        response.raise_for_status()

        return response.json()