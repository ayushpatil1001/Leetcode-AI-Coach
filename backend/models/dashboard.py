from pydantic import BaseModel
from typing import List, Dict, Any


class DashboardResponse(BaseModel):

    profile: Dict[str, Any]

    stats: Dict[str, Any]

    analytics: Dict[str, Any]

    xp: Dict[str, Any]

    streak: Dict[str, Any]

    badges: List[str]