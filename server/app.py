import os

from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from crud import create_user, get_users
from database import Base, engine, get_db
from schemas import UserCreate, UserResponse

os.makedirs("data", exist_ok=True)

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/users", response_model=UserResponse)
def add_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user.name)


@app.get("/users", response_model=list[UserResponse])
def list_users(db: Session = Depends(get_db)):
    return get_users(db)