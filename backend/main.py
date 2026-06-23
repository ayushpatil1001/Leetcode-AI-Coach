from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.roadmap import router as roadmap_router
from dotenv import load_dotenv

load_dotenv()


app = FastAPI(
    title="LeetCode AI Coach",
    version="1.0.0"
)

app.include_router(
    roadmap_router,
    prefix="/api"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "LeetCode AI Coach API Running"
    }