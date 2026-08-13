from fastapi import APIRouter
from fastapi import HTTPException

from services.leetcode_service import LeetCodeService

router = APIRouter()


# ==========================================
# Get LeetCode Profile
# ==========================================

@router.get("/{username}")
def get_leetcode_profile(username: str):

    data = LeetCodeService.get_profile(username)

    if not data:

        raise HTTPException(
            status_code=404,
            detail="LeetCode profile not found"
        )

    return data