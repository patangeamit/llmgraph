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
    parent_query_id: str 

class QueryResponse(BaseModel):
    id: str
    query_text: str
    user_id: int
    parent_query_id: str | None = None
    status: str
    llm_response: str | None = None
    model_config = {
        "from_attributes": True
    }