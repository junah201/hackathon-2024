from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from sqlalchemy.orm import Session

from app.database import schemas, models
from app.database.database import get_db
from app.utils.oauth2 import get_current_user

from typing import List, Optional

router = APIRouter(
    prefix="/schedule",
)


@router.get(
    "/{id}",
    response_model=schemas.Schedule,
    summary="Schedules inquiry",
)
def get_schedule_id(
    id: int,
    db: Session = Depends(get_db)
):
    db_schedule: Optional[models.Schedule] = db.query(models.Schedule)\
        .filter(models.Schedule.id == id)\
        .first()

    if not db_schedule:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cannot find the schedule"
        )

    return db_schedule


@router.get(
    "/my/all",
    response_model=schemas.ScheduleList,
    summary="My schedules inquiry",
)
def get_my_schedule(
    limit: int = 10,
    skip: int = 0,
    db: Session = Depends(get_db),
    user: models.Student = Depends(get_current_user)
):
    db_schedules: List[models.Schedule] = db.query(models.Schedule)\
        .filter(models.Schedule.student_id == user.id)\
        .order_by(models.Schedule.id.desc())

    return schemas.ScheduleList(
        total=db_schedules.count(),
        items=db_schedules.limit(limit).offset(skip).all()
    )


@router.get(
    "/my/all/active",
    response_model=schemas.ScheduleList,
    summary="My active schedules inquiry",
)
def get_my_active_schedule(
    limit: int = 10,
    skip: int = 0,
    db: Session = Depends(get_db),
    user: models.Student = Depends(get_current_user)
):
    now = datetime.now()

    db_schedules: List[models.Schedule] = db.query(models.Schedule)\
        .filter(models.Schedule.student_id == user.id)\
        .filter(models.Schedule.start_time > now)\
        .order_by(models.Schedule.start_time)

    return schemas.ScheduleList(
        total=db_schedules.count(),
        items=db_schedules.limit(limit).offset(skip).all()
    )


@router.post(
    "/{professor_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Student schedule create",
)
def create_student_schedule(
    professor_id: int,
    schedule_create: schemas.ScheduleStudentCreate,
    user: models.Student = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    start_time = datetime.strptime(
        f"{schedule_create.date} {schedule_create.time}", "%Y-%m-%d %H:%M")
    end_time = start_time + timedelta(minutes=30)

    db_schedule: Optional[models.Schedule] = db.query(models.Schedule)\
        .filter(models.Schedule.professor_id == professor_id)\
        .filter(models.Schedule.start_time == start_time)\
        .first()

    if db_schedule:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Time time is already booked"
        )

    db_schedule = models.Schedule(
        professor_id=professor_id,
        student_id=user.id,
        topic=schedule_create.topic,
        start_time=start_time,
        end_time=end_time,
        type="student"
    )
    db.add(db_schedule)
    db.commit()


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Schedule cancel / delete",
)
def delete_schedule(
    id: int,
    db: Session = Depends(get_db),
    user: models.Student = Depends(get_current_user)
):
    db_schedule: Optional[models.Schedule] = db.query(models.Schedule)\
        .filter(models.Schedule.id == id)\
        .filter(models.Schedule.student_id == user.id)\
        .first()

    if not db_schedule:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cannot find the schedule"
        )

    db.delete(db_schedule)
    db.commit()
