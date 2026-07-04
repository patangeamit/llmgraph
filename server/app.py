import os

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from crud import create_query, create_user, get_users, get_queries
from database import Base, engine, get_db
from schemas import UserCreate, UserResponse, QueryCreate, QueryResponse

from llm import inference

os.makedirs("data", exist_ok=True)

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/users", response_model=UserResponse)
def add_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user.name)


@app.get("/users", response_model=list[UserResponse])
def list_users(db: Session = Depends(get_db)):
    return get_users(db)

@app.post("/query", response_model=QueryResponse)
def add_query(query: QueryCreate, db: Session = Depends(get_db)):
    response_text, status = inference(query.query_text)
    return create_query(db, query.query_text, query.user_id, query.parent_query_id, status, response_text)

@app.get("/queries", response_model=list[QueryResponse])
def list_queries(db: Session = Depends(get_db)):
    return get_queries(db)