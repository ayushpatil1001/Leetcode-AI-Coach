from fastapi import APIRouter

from services.leetcode_graphql import LeetCodeGraphQL

router = APIRouter()


@router.get("/profile/{username}")

def get_profile(username: str):

    return LeetCodeGraphQL.get_user_profile(username)