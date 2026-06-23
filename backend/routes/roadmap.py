from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os

router = APIRouter()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

class RoadmapRequest(BaseModel):
    concept: str

@router.post("/generate-roadmap")
async def generate_roadmap(data: RoadmapRequest):

    prompt = f"""
Create a complete learning roadmap for {data.concept}.

Return ONLY JSON.

Format:

{{
  "title":"",
  "levels":[
    {{
      "level":"",
      "description":"",
      "estimated_hours":"",
      "topics":[],
      "practice_questions":[]
    }}
  ]
}}

Create:
Beginner
Intermediate
Advanced
Expert

Each level must contain:
- Description
- Estimated Hours
- Topics
- 5 Practice Questions
"""

    response = model.generate_content(prompt)

    return {
        "response": response.text
    }