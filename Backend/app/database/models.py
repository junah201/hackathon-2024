from sqlalchemy import Column, String, INTEGER, DateTime, JSON, ForeignKey, BOOLEAN, func, VARCHAR, VARCHAR, DATE, BIGINT
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.dialects.mysql import INTEGER
from app.database.database import Base, engine


class BaseMixin():
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    created_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        comment="생성 시점",
    )
    updated_at = Column(
        DateTime,
        nullable=False,
        default=func.now(),
        onupdate=func.now(),
        comment="마지막 수정 시점"
    )

    class Config:
        orm_mode = True


class Student(Base, BaseMixin):
    __tablename__ = "student"

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        nullable=False,
        comment="학생 고유 번호",
    )
    name = Column(
        VARCHAR(128),
        nullable=False,
        comment="유저 이름",
    )
    email = Column(
        VARCHAR(512),
        nullable=False,
        unique=True,
        comment="유저 이메일",
    )
    password = Column(
        VARCHAR(512),
        nullable=False,
        comment="해쉬된 비밀번호",
    )


class Professor(Base, BaseMixin):
    __tablename__ = "professor"

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        nullable=False,
        comment="교수님 고유 번호",
    )
    name = Column(
        VARCHAR(128),
        nullable=False,
        comment="교수님 이름",
    )
    email = Column(
        VARCHAR(512),
        nullable=False,
        unique=True,
        comment="교수님 이메일",
    )
    profile = Column(
        VARCHAR(512),
        nullable=False,
        comment="프로필 이미지 S3 URL",
    )
    lectures = relationship(
        "Lecture",
        back_populates="professor",
    )
    password = Column(
        VARCHAR(512),
        nullable=False,
        comment="해쉬된 비밀번호",
    )
    major = Column(
        VARCHAR(128),
        nullable=False,
        comment="전공",
    )
    office = Column(
        VARCHAR(128),
        nullable=False,
        comment="사무실 위치",
    )


class FixedSchedule(Base, BaseMixin):
    __tablename__ = "fixed_schedule"

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        nullable=False,
        comment="고정 스케줄 고유 번호",
    )
    professor_id = Column(
        INTEGER(unsigned=True),
        ForeignKey("professor.id"),
        nullable=False,
        comment="교수님 고유 번호",
    )
    professor = relationship(
        "Professor",
        foreign_keys=[professor_id]
    )
    # 요일 (월, 화, 수, 목, 금, 토, 일)
    day = Column(
        VARCHAR(10),
        nullable=False,
        comment="요일",
    )
    # 시작 시간 (HH:MM)
    start_time = Column(
        DateTime,
        nullable=False,
        comment="시작 시간",
    )
    # 종료 시간 (HH:MM)
    end_time = Column(
        DateTime,
        nullable=False,
        comment="종료 시간",
    )

# 수업


class Lecture(Base, BaseMixin):
    __tablename__ = "lecture"

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        nullable=False,
        comment="수업 고유 번호",
    )
    professor_id = Column(
        INTEGER(unsigned=True),
        ForeignKey("professor.id"),
        nullable=False,
        comment="교수님 고유 번호",
    )
    professor = relationship(
        "Professor",
        foreign_keys=[professor_id],
        back_populates="lectures"
    )
    name = Column(
        VARCHAR(128),
        nullable=False,
        comment="수업 이름",
    )

# 일정


class Schedule(Base, BaseMixin):
    __tablename__ = "schedule"

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        unique=True,
        nullable=False,
        comment="일정 고유 번호",
    )
    professor_id = Column(
        INTEGER(unsigned=True),
        ForeignKey("professor.id"),
        nullable=False,
        comment="교수님 고유 번호",
    )
    professor = relationship(
        "Professor",
        foreign_keys=[professor_id]
    )
    student_id = Column(
        INTEGER(unsigned=True),
        ForeignKey("student.id"),
        nullable=True,
        comment="학생 고유 번호",
    )
    student = relationship(
        "Student",
        foreign_keys=[student_id]
    )
    topic = Column(
        VARCHAR(256),
        nullable=False,
        comment="대화 주제",
    )
    start_time = Column(
        DateTime,
        nullable=False,
        comment="시작 시간",
    )
    end_time = Column(
        DateTime,
        nullable=False,
        comment="종료 시간",
    )
    status = Column(
        VARCHAR(20),
        nullable=False,
        comment="일정 상태 (신청됨, 거절됨)",
        default="신청됨",
    )
    type = Column(
        VARCHAR(20),
        nullable=False,
        comment="일정 종류 (학생 예약, 교수 개인 일정)",
    )
