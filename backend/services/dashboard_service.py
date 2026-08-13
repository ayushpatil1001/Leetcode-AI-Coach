from services.leetcode import LeetCodeClient

from graphql.profile_query import PROFILE_QUERY
from graphql.contest_query import CONTEST_QUERY
from graphql.contest_history_query import CONTEST_HISTORY_QUERY
from graphql.submission_calendar_query import SUBMISSION_CALENDAR_QUERY
from graphql.recent_submission_query import RECENT_SUBMISSION_QUERY
from graphql.badges_query import BADGES_QUERY
from graphql.topic_query import TOPIC_QUERY
from graphql.language_query import LANGUAGE_QUERY

client = LeetCodeClient()


def graphql(query, variables):
    try:
        result = client.query(query, variables)
        if result and isinstance(result, dict) and "data" in result and result["data"] is not None:
            return result["data"]
        return {}
    except Exception as e:
        print(f"[LeetCode GraphQL Query Warning] {variables}: {e}")
        return {}


# ==========================
# Individual Queries with Robust Fallbacks
# ==========================

def get_profile(username):
    data = graphql(PROFILE_QUERY, {"username": username})
    if not data or "matchedUser" not in data or not data["matchedUser"]:
        return {
            "matchedUser": {
                "username": username,
                "profile": {
                    "realName": username,
                    "userAvatar": "https://assets.leetcode.com/users/default_avatar.jpg",
                    "ranking": 100000,
                    "reputation": 0,
                    "aboutMe": "LeetCode Developer",
                    "school": "",
                    "websites": [],
                    "countryName": "",
                    "company": "",
                    "jobTitle": "",
                    "skillTags": [],
                    "starRating": 0.0
                },
                "submitStats": {
                    "acSubmissionNum": [
                        {"difficulty": "All", "count": 0, "submissions": 0},
                        {"difficulty": "Easy", "count": 0, "submissions": 0},
                        {"difficulty": "Medium", "count": 0, "submissions": 0},
                        {"difficulty": "Hard", "count": 0, "submissions": 0}
                    ]
                }
            }
        }
    return data


def get_contest(username):
    data = graphql(CONTEST_QUERY, {"username": username})
    if not data or "userContestRanking" not in data or not data["userContestRanking"]:
        return {
            "userContestRanking": {
                "attendedContestsCount": 0,
                "rating": 1500,
                "globalRanking": 0,
                "totalParticipants": 100000,
                "topPercentage": 50.0,
                "badge": None
            }
        }
    return data


def get_contest_history(username):
    data = graphql(CONTEST_HISTORY_QUERY, {"username": username})
    if not data or "userContestRankingHistory" not in data:
        return {"userContestRankingHistory": []}
    return data


def get_calendar(username):
    data = graphql(SUBMISSION_CALENDAR_QUERY, {"username": username})
    if not data or "matchedUser" not in data or not data["matchedUser"]:
        return {
            "matchedUser": {
                "userCalendar": {
                    "activeYears": [2026],
                    "streak": 0,
                    "totalActiveDays": 0,
                    "submissionCalendar": "{}"
                }
            }
        }
    return data


def get_recent(username):
    data = graphql(RECENT_SUBMISSION_QUERY, {"username": username})
    if not data or "recentAcSubmissionList" not in data:
        return {"recentAcSubmissionList": []}
    return data


def get_badges(username):
    data = graphql(BADGES_QUERY, {"username": username})
    if not data or "matchedUser" not in data or not data["matchedUser"]:
        return {"matchedUser": {"badges": []}}
    return data


def get_topics(username):
    data = graphql(TOPIC_QUERY, {"username": username})
    if not data or "matchedUser" not in data or not data["matchedUser"]:
        return {
            "matchedUser": {
                "tagProblemCounts": {
                    "advanced": [],
                    "intermediate": [],
                    "fundamental": []
                }
            }
        }
    return data


def get_languages(username):
    data = graphql(LANGUAGE_QUERY, {"username": username})
    if not data or "matchedUser" not in data or not data["matchedUser"]:
        return {"matchedUser": {"languageProblemCount": []}}
    return data


# ==========================
# Complete Dashboard
# ==========================

def get_dashboard(username):
    return {
        "profile": get_profile(username),
        "contest": get_contest(username),
        "history": get_contest_history(username),
        "calendar": get_calendar(username),
        "recent": get_recent(username),
        "badges": get_badges(username),
        "topics": get_topics(username),
        "languages": get_languages(username)
    }