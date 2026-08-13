from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv

# Database
from database import Base, engine

# Models (important for table creation)
from models.user import User

# Routers
from routes.roadmap import router as roadmap_router
from routes.coach import router as coach_router
from routes.auth import router as auth_router
from routes.profile import router as profile_router
from routes.upload import router as upload_router
from fastapi.staticfiles import StaticFiles
from routes.leetcode import router as leetcode_router
from routes.leetcode_graph import router as graph_router
from routes.dashboard import router as dashboard_router


load_dotenv()

# Create SQLite tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LeetCode AI Coach",
    version="1.0.0",
    description="AI-powered LeetCode learning platform"
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React/Vite
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Routes
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

# AI Coach Routes
app.include_router(
    coach_router,
    prefix="/api",
    tags=["Coach"]
)

# Roadmap Routes
app.include_router(
    roadmap_router,
    prefix="/api",
    tags=["Roadmap"]
)

app.include_router(
    profile_router,
    prefix="/api/profile",
    tags=["Profile"]
)

app.include_router(
    upload_router,
    prefix="/api/upload",
    tags=["Upload"]
)

app.include_router(
    leetcode_router,
    prefix="/api/leetcode",
    tags=["LeetCode"]
)

app.include_router(

    graph_router,

    prefix="/api/graphql",

    tags=["GraphQL"]

)

app.include_router(

    dashboard_router,

    prefix="/api/dashboard",

    tags=["Dashboard"]

)


@app.get("/")
def home():
    return {
        "message": "LeetCode AI Coach API Running",
        "version": "1.0.0",
        "status": "online"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }