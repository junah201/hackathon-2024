import datetime
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from matplotlib.style import available
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
    prefix="/fixed_schedule",
)


@router.get(
    "/{professor_id}/all_available_time/{date}",
    response_model=schemas.AvailableTimeList
)
def get_all_available_time(
    professor_id: int,
    date: str,
    db: Session = Depends(get_db)
):
    date = datetime.datetime.strptime(date, "%Y-%m-%d")

    요일 = date.weekday()
    # 요일_List = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    요일_List = ["월", "화", "수", "목", "금", "토", "일"]
    요일 = 요일_List[요일]

    db_fixed_schedules: List[models.FixedSchedule] = db.query(models.FixedSchedule)\
        .filter(models.FixedSchedule.professor_id == professor_id)\
        .filter(models.FixedSchedule.day == 요일)\
        .all()

    db_all_schedule: List[models.Schedule] = db.query(models.Schedule)\
        .filter(models.Schedule.professor_id == professor_id)\
        .filter(models.Schedule.start_time >= date)\
        .filter(models.Schedule.end_time < date + datetime.timedelta(days=1))\
        .all()

    unavailable_time_list = []

    for db_schedule in db_all_schedule:
        start_time = db_schedule.start_time
        end_time = db_schedule.end_time

        while start_time < end_time:
            unavailable_time_list.append(start_time.strftime("%H:%M"))
            start_time += datetime.timedelta(minutes=30)

    print(unavailable_time_list)

    available_time_list = []

    for db_fixed_schedule in db_fixed_schedules:
        # 30분 단위로 시간을 쪼개서 available_time_list에 추가
        start_time = db_fixed_schedule.start_time
        end_time = db_fixed_schedule.end_time

        while start_time < end_time:
            if start_time.strftime("%H:%M") not in unavailable_time_list:
                available_time_list.append(
                    schemas.AvailableTime(
                        start_time=start_time,
                        available=True
                    )
                )
            else:
                available_time_list.append(
                    schemas.AvailableTime(
                        start_time=start_time,
                        available=False
                    )
                )
            start_time += datetime.timedelta(minutes=30)

    return schemas.AvailableTimeList(
        total=len(available_time_list),
        items=available_time_list
    )


@router.get("/{id}", response_model=schemas.FixedSchedule)
def get_fixed_schedule_by_id(
    id: int,
    db: Session = Depends(get_db)
):
    db_fixed_schedule: Optional[models.FixedSchedule] = db.query(models.FixedSchedule)\
        .filter(models.FixedSchedule.id == id)\
        .first()

    if not db_fixed_schedule:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found"
        )

    return db_fixed_schedule
