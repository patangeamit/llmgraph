from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str


class UserResponse(BaseModel):
    id: int
    name: str

    model_config = {
        "from_attributes": True
    }

class QueryCreate(BaseModel):
    query_text: str
    user_id: int
    parent_query_id: int | None = None  # Optional field for top-level queries

class QueryResponse(BaseModel):
    id: int
    query_text: str
    user_id: int
    parent_query_id: int | None = None
    status: str
    llm_response: str | None = None
    model_config = {
        "from_attributes": True
    }