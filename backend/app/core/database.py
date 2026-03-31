from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# this is the connection to the database, we will use this to create sessions and interact with the database
engine = create_engine(
    DATABASE_URL,
    connect_args = {"sslmode": "require"}
)

# SessionLocal is a factory for creating new Session objects, which are used to interact with the database. We will use this to create sessions in our API endpoints.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base is the base class for our database models. We will use this to create our database models.
Base = declarative_base()

def get_db():
    """
    This function is a dependency that we will use in our API endpoints to get a database session. It will create a new session, yield it to the endpoint, and then close the session after the endpoint is done.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()