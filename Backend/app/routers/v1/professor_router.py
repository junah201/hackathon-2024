from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from sqlalchemy.orm import Session

from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.verify import verify_password, hash_password
from app.utils.professor_oauth2 import get_current_professor, create_access_token
from app.common.config import ACCESS_TOKEN_EXPIRES_IN
from sqlalchemy import or_

from typing import List, Optional

router = APIRouter(
    prefix="/professor",
)


@router.post(
    "/signup",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Professor Registration",
)
def create_professor(
    professor_create: schemas.ProfessorCreate,
    db: Session = Depends(get_db)
):
    db_professor: Optional[models.Professor] = db.query(models.Professor)\
        .filter(models.Professor.email == professor_create.email)\
        .first()

    if db_professor:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists."
        )

    professor_create.password = hash_password(professor_create.password)
    db_professor = models.Professor(
        **professor_create.dict(),
    )
    db.add(db_professor)
    db.commit()


@router.post(
    "/login",
    summary="Professor Login",
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    db_professor: Optional[models.Professor] = db.query(models.Professor)\
        .filter(models.Professor.email == form_data.username)\
        .first()
    if not db_professor:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or password does not match",
        )

    if not verify_password(form_data.password, db_professor.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or password does not match",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": db_professor.email}
    )

    return {
        "status": "success",
        "access_token": access_token,
        "access_token_expires_in": ACCESS_TOKEN_EXPIRES_IN * 60,
    }


@router.get("/me", response_model=schemas.Professor)
def get_professor_me(current_user: models.Professor = Depends(get_current_professor)):
    return current_user


@router.get("/all", response_model=schemas.ProfessorList)
def get_all_professor(
    skip: int = 0,
    limit: int = 10,
    query: str = "",
    db: Session = Depends(get_db)
):
    db_professors: List[models.Professor] = db.query(models.Professor)

    if query:
        query_filter = or_(
            models.Professor.name.like(f"%{query}%"),
            models.Lecture.name.like(f"%{query}%")
        )

        db_professors: List[models.Professor] = db.query(
            models.Professor).outerjoin(models.Lecture).filter(query_filter)

    return schemas.ProfessorList(
        total=db_professors.count(),
        items=db_professors.offset(skip).limit(limit).all()
    )


@router.get("/{id}", response_model=schemas.Professor)
def get_professor_by_id(
    id: int,
    db: Session = Depends(get_db)
):
    db_professor: Optional[models.Professor] = db.query(models.Professor)\
        .filter(models.Professor.id == id)\
        .first()

    if not db_professor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found"
        )

    return db_professor
