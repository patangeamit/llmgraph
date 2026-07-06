from sqlalchemy import Column, Integer, String

from database import Base
from uuid import uuid4

class User(Base):
    __tablename__ = "users"

    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
        index=True,
    )
    name = Column(String, nullable=False)

class Query(Base):
    __tablename__ = "queries"
    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
        index=True,
    )
    query_text = Column(String, nullable=False)
    user_id = Column(String(36), nullable=False)
    parent_query_id = Column(String(36), nullable=True)  # This can be null for top-level queries
    status = Column(String, nullable=False, default="pending")  # e.g., pending, completed, failed
    llm_response = Column(String, nullable=True)  # Store the LLM's response here