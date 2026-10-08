import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


# backend/.env ka path
BASE_DIR = Path(__file__).resolve().parents[1]

# .env load karo
load_dotenv(BASE_DIR / ".env")


# Database URL
DATABASE_URL = os.getenv("DATABASE_URL")


# PostgreSQL engine
engine = create_engine(DATABASE_URL)


# Database session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# Base class for SQLAlchemy models
Base = declarative_base()


# Database dependency
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()