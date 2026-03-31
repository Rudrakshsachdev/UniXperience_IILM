from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .core.database import get_db

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/test-db")
async def test_db(db: Session = Depends(get_db)):
    # this is just a test endpoint to check if the database connection is working. We will replace this with actual endpoints later.
    return {"message": "Database connection successful"}