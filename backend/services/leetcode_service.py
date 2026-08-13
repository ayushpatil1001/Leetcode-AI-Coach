import requests

GRAPHQL_URL = "https://leetcode.com/graphql"


class LeetCodeService:

    @staticmethod
    def get_profile(username: str):

        query = """
        query getUserProfile($username: String!) {

          matchedUser(username: $username) {

            username

            profile {

              ranking

              reputation

              realName

              aboutMe

              userAvatar
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
            GRAPHQL_URL,
            json={
                "query": query,
                "variables": variables
            },
            headers={
                "Content-Type": "application/json"
            }
        )

        if response.status_code != 200:

            return None

        data = response.json()

        if (
            "data" not in data
            or
            data["data"]["matchedUser"] is None
        ):

            return None

        user = data["data"]["matchedUser"]

        stats = user["submitStats"]["acSubmissionNum"]

        solved = {}

        total = 0

        for item in stats:

            difficulty = item["difficulty"]

            solved[difficulty] = item["count"]

            if difficulty != "All":

                total += item["count"]

        all_stats = next(
            (
                x
                for x in stats
                if x["difficulty"] == "All"
            ),
            None
        )

        acceptance = 0

        if all_stats and all_stats["submissions"] > 0:

            acceptance = round(
                (
                    all_stats["count"]
                    /
                    all_stats["submissions"]
                )
                * 100,
                2
            )

        return {

            "username":
                user["username"],

            "avatar":
                user["profile"]["userAvatar"],

            "real_name":
                user["profile"]["realName"],

            "ranking":
                user["profile"]["ranking"],

            "reputation":
                user["profile"]["reputation"],

            "about":
                user["profile"]["aboutMe"],

            "totalSolved":
                solved.get("All", 0),

            "easySolved":
                solved.get("Easy", 0),

            "mediumSolved":
                solved.get("Medium", 0),

            "hardSolved":
                solved.get("Hard", 0),

            "acceptanceRate":
                acceptance

        }