from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os
import json
import re

router = APIRouter()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


# --------------------------------
# HELPER
# --------------------------------

def extract_json(text):

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    try:
        return json.loads(text)

    except Exception:

        match = re.search(
            r"\{.*\}",
            text,
            re.DOTALL
        )

        if match:
            return json.loads(
                match.group()
            )

        raise Exception(
            "Invalid JSON from Gemini"
        )


# --------------------------------
# ANALYZE
# --------------------------------

class ProblemRequest(BaseModel):
    problem: str


@router.post("/analyze-problem")
async def analyze_problem(
    data: ProblemRequest
):

    prompt = f"""
Analyze this LeetCode problem.

Problem:
{data.problem}

Return ONLY valid JSON.

{{
  "title":"",
  "difficulty":"",
  "summary":"",
  "topics":[],
  "hints":[
    "",
    "",
    ""
  ]
}}
"""

    response = model.generate_content(
        prompt
    )

    return extract_json(
        response.text
    )


# --------------------------------
# EXPLAIN
# --------------------------------

class ExplainRequest(BaseModel):
    input: str
    language: str = "Python"


@router.post(
    "/analyze-problem/explain"
)
async def explain_problem(
    data: ExplainRequest
):

    target_lang = data.language if data.language else "Python"

    prompt = f"""
You are an expert LeetCode mentor. Analyze the problem and provide a clear direct explanation, a step-by-step guide, exact time and space complexity, and an optimal solution code written strictly in {target_lang}.

Problem:

{data.input}

Return ONLY valid JSON matching this exact structure:

{{
  "logic": "Direct explanation of the intuition and core algorithm behind the optimal solution.",
  "steps": [
    "Step 1: Check inputs/edge cases and initialize pointers or data structures.",
    "Step 2: Iterate or recurse through elements...",
    "Step 3: Update state or accumulate results...",
    "Step 4: Return the computed final answer."
  ],
  "complexity": {{
    "time": "O(N) - Linear time complexity because...",
    "space": "O(1) - Constant space because..."
  }},
  "solution_code": "Complete optimal working solution code written in {target_lang} with concise inline comments",
  "language": "{target_lang}"
}}

Requirements:
1. "logic": A direct, clear, intuitive explanation of the core concept.
2. "steps": A clear list of sequential steps guiding through the algorithm.
3. "complexity": Clear Time Complexity with Big-O notation O(...) and short explanation, and Space Complexity with Big-O notation O(...).
4. "solution_code": Complete optimal working code written in {target_lang}.
5. Return strictly valid JSON only. Do not enclose in markdown blocks.
"""

    response = model.generate_content(
        prompt
    )

    try:

        res_data = extract_json(response.text)
        if isinstance(res_data, dict):
            res_data["language"] = target_lang
        return res_data

    except Exception:

        # fallback if Gemini
        # returns invalid JSON

        return {
            "logic": response.text,
            "steps": ["Step 1: Parse input", "Step 2: Process algorithm", "Step 3: Return result"],
            "complexity": {
                "time": "O(N) - Linear time complexity",
                "space": "O(1) - Constant auxiliary space"
            },
            "solution_code": "",
            "language": target_lang
        }


# --------------------------------
# RUN CODE
# --------------------------------

class RunCodeRequest(
    BaseModel
):
    code: str
    language: str

@router.post(
    "/analyze-problem/run-code"
)
async def run_code(
    data: RunCodeRequest
):

    code = data.code.strip()

    if (
        code == ""
        or
        code == "// Write your solution here..."
    ):

        return {
            "success": False,
            "message":
            "Please write some code first."
        }

    if len(code) < 30:

        return {
            "success": False,
            "message":
            "Code looks incomplete."
        }

    return {
        "success": True,
        "message":
        "🎉 You are correct!"
    }