from typing import List, Optional
from sqlalchemy.orm import Session
from app.database import models, schemas
from app.utils.verify import hash_password


def get_student_by_email(db: Session, email: str) -> models.Student:
    return db.query(models.Student).filter(models.Student.email == email).first()


def create_student(db: Session, student_create: schemas.StudentCreate) -> models.Student:
    student_create.password = hash_password(student_create.password)
    db_student = models.Student(
        **student_create.dict(),
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def get_professor_by_email(db: Session, email: str) -> models.Professor:
    return db.query(models.Professor).filter(models.Professor.email == email).first()
