from fastapi import Form
from datetime import datetime, date
from pydantic import BaseModel, validator, EmailStr, constr
from pydantic.types import PositiveInt, NonNegativeInt
from typing import Optional, List, Union, TypeVar


class BaseMixin(BaseModel):
    id: PositiveInt
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class Student(BaseMixin, StudentCreate):
    pass


class ProfessorCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    profile: Optional[str] = None
    major: str
    office: str


class Professor(BaseMixin, ProfessorCreate):
    lectures: List["Lecture"] = []


class ProfessorList(BaseModel):
    items: List[Professor]
    total: int


class FixedScheduleCreate(BaseModel):
    day: str
    start_time: datetime
    end_time: datetime


class FixedSchedule(BaseMixin, FixedScheduleCreate):
    professor_id: PositiveInt
    professor: Professor


class LectureCreate(BaseModel):
    name: str


class Lecture(BaseMixin, LectureCreate):
    # professor_id: PositiveInt
    # professor: Professor
    pass


class ScheduleCreate(BaseModel):
    topic: str
    start_time: datetime
    end_time: datetime
    type: str


class ScheduleStudentCreate(BaseModel):
    topic: str
    date: str
    time: str


class Schedule(BaseMixin, ScheduleCreate):
    professor_id: PositiveInt
    professor: Professor
    student_id: PositiveInt
    student: Student
    status: str


class ScheduleList(BaseModel):
    items: List[Schedule]
    total: int


Professor.update_forward_refs()


class AvailableTime(BaseModel):
    start_time: datetime


class AvailableTimeList(BaseModel):
    items: List[AvailableTime]
    total: int
