from fastapi import APIRouter

router = APIRouter()

@router.post("/run-code")
async def run_code(data: dict):

    return {
        "status": "Accepted",
        "output": "Hello World"
    }