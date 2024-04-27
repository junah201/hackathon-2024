from fastapi import APIRouter
from app.routers.v1 import (
    student_router,
    file_router,
    schedule_router,
    professor_router,
    fixed_schedule_router,
    professor_schedule_router
)

router = APIRouter(
    prefix="/v1",
    tags=["v1"],
)


router.include_router(student_router.router)
router.include_router(file_router.router)
router.include_router(schedule_router.router)
router.include_router(professor_router.router)
router.include_router(fixed_schedule_router.router)
router.include_router(professor_schedule_router.router)
