from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .core.database import get_db
from .api.v1.endpoints import chat


app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact frontend URL (e.g., "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/test-db")
async def test_db(db: Session = Depends(get_db)):
    # this is just a test endpoint to check if the database connection is working. We will replace this with actual endpoints later.
    return {"message": "Database connection successful"}