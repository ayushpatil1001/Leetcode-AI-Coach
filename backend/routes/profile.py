from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from pydantic import BaseModel

from sqlalchemy.orm import Session

from database import get_db
from models.user import User

router = APIRouter()


# =====================================
# Profile Update Schema
# =====================================

class ProfileUpdate(BaseModel):

    headline: str | None = None

    bio: str | None = None

    phone: str | None = None

    location: str | None = None

    university: str | None = None

    degree: str | None = None

    graduation_year: str | None = None

    github_username: str | None = None

    leetcode_username: str | None = None

    linkedin_url: str | None = None

    portfolio_url: str | None = None

    skills: str | None = None

    interests: str | None = None

    avatar_url: str | None = None

    banner_url: str | None = None


# =====================================
# Get Profile
# =====================================

@router.get("/{user_id}")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {

        "id": user.id,

        "full_name": user.full_name,

        "email": user.email,

        "avatar_url": user.avatar_url,

        "banner_url": user.banner_url,

        "headline": user.headline,

        "bio": user.bio,

        "phone": user.phone,

        "location": user.location,

        "university": user.university,

        "degree": user.degree,

        "graduation_year":
            user.graduation_year,

        "github_username":
            user.github_username,

        "leetcode_username":
            user.leetcode_username,

        "linkedin_url":
            user.linkedin_url,

        "portfolio_url":
            user.portfolio_url,

        "skills":
            user.skills,

        "interests":
            user.interests
    }


# =====================================
# Update Profile
# =====================================

@router.put("/{user_id}")
def update_profile(
    user_id: int,
    profile: ProfileUpdate,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.headline = profile.headline

    user.bio = profile.bio

    user.phone = profile.phone

    user.location = profile.location

    user.university = profile.university

    user.degree = profile.degree

    user.graduation_year = (
        profile.graduation_year
    )

    user.github_username = (
        profile.github_username
    )

    user.leetcode_username = (
        profile.leetcode_username
    )

    user.linkedin_url = (
        profile.linkedin_url
    )

    user.portfolio_url = (
        profile.portfolio_url
    )

    user.skills = profile.skills

    user.interests = profile.interests

    user.avatar_url = (
        profile.avatar_url
    )

    user.banner_url = (
        profile.banner_url
    )

    db.commit()

    db.refresh(user)

    return {

        "message":
            "Profile updated successfully",

        "profile": {

            "id": user.id,

            "full_name":
                user.full_name,

            "email":
                user.email,

            "avatar_url":
                user.avatar_url,

            "banner_url":
                user.banner_url,

            "headline":
                user.headline,

            "bio":
                user.bio,

            "phone":
                user.phone,

            "location":
                user.location,

            "university":
                user.university,

            "degree":
                user.degree,

            "graduation_year":
                user.graduation_year,

            "github_username":
                user.github_username,

            "leetcode_username":
                user.leetcode_username,

            "linkedin_url":
                user.linkedin_url,

            "portfolio_url":
                user.portfolio_url,

            "skills":
                user.skills,

            "interests":
                user.interests
        }
    }


# =====================================
# Delete Profile
# =====================================

@router.delete("/{user_id}")
def delete_profile(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)

    db.commit()

    return {
        "message":
            "User deleted successfully"
    }