from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from sqlalchemy.orm import Session

from app.database import crud, schemas, models
from app.database.database import get_db
from app.utils.verify import verify_password, hash_password
from app.utils.oauth2 import create_access_token, get_current_user
from app.common.config import ACCESS_TOKEN_EXPIRES_IN

from typing import List, Optional

router = APIRouter(
    prefix="/student",
)


@router.post(
    "/signup",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="학생 회원가입",
)
def create_student(student_create: schemas.StudentCreate, db: Session = Depends(get_db)):
    user = crud.get_student_by_email(db=db, email=student_create.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists."
        )
    crud.create_student(db=db, student_create=student_create)


@router.post(
    "/login",
    summary="학생 로그인",
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = crud.get_student_by_email(db, form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or password does not match",
        )

    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or password does not match",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "status": "success",
        "access_token": access_token,
        "access_token_expires_in": ACCESS_TOKEN_EXPIRES_IN * 60,
    }


@router.get("/me", response_model=schemas.Student)
def get_user_me(current_user: models.Student = Depends(get_current_user)):
    return current_user
