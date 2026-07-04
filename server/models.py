from sqlalchemy import Column, Integer, String

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

class Query(Base):
    __tablename__ = "queries"

    id = Column(Integer, primary_key=True, index=True)
    query_text = Column(String, nullable=False)
    user_id = Column(Integer, nullable=False)
    parent_query_id = Column(Integer, nullable=True)  # This can be null for top-level queries
    status = Column(String, nullable=False, default="pending")  # e.g., pending, completed, failed
    llm_response = Column(String, nullable=True)  # Store the LLM's response here