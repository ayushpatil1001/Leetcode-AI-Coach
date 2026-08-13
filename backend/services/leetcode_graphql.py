import requests


class LeetCodeGraphQL:

    URL = "https://leetcode.com/graphql"

    @staticmethod
    def get_user_profile(username: str):

        query = """
        query getUserProfile($username: String!) {

          matchedUser(username: $username) {

            username

            profile {
              ranking
              reputation
              realName
              userAvatar
              aboutMe
            }

            submitStats {

              acSubmissionNum {
                difficulty
                count
                submissions
              }

            }

          }

        }
        """

        variables = {
            "username": username
        }

        response = requests.post(

            LeetCodeGraphQL.URL,

            json={

                "query": query,

                "variables": variables

            }

        )

        return response.json()