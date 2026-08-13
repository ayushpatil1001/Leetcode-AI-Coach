from fastapi import APIRouter

from services.dashboard_service import (
    get_profile,
    get_contest,
    get_calendar,
    get_recent,
    get_contest_history,
    get_badges,
    get_topics,
    get_languages,
)

router = APIRouter()


@router.get("/{username}")
def dashboard(username: str):

    profile = get_profile(username)

    contest = get_contest(username)

    calendar = get_calendar(username)

    recent = get_recent(username)

    history = get_contest_history(username)

    badges = get_badges(username)
    
    topics = get_topics(username)

    languages = get_languages(username)
    return {

        "profile": profile,

        "contest": contest,

        "calendar": calendar,

        "recent": recent,

        "history": history,

        "badges": badges,

        "topics": topics,

        "languages":languages

    }