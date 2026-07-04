from sqlalchemy.orm import Session

from models import User, Query


def create_user(db: Session, name: str):
    user = User(name=name)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_users(db: Session):
    return db.query(User).all()


def create_query(db: Session, query_text: str, user_id: int, parent_query_id: int = None, status: str = "pending", llm_response: str = None):
    query = Query(query_text=query_text, user_id=user_id, parent_query_id=parent_query_id, status=status, llm_response=llm_response)
    db.add(query)
    db.commit()
    db.refresh(query)
    return query


def get_queries(db: Session):
    return db.query(Query).all()