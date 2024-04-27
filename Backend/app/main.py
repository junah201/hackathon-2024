from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from starlette.types import ASGIApp
from starlette.requests import Request
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.errors import ServerErrorMiddleware
from starlette.middleware.gzip import GZipMiddleware
from starlette import status

import datetime
import traceback
from app.database import models
from app.database.database import engine
from app.routers import v1_router

models.Base.metadata.create_all(bind=engine, checkfirst=True)

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://snuh.vercel.app",
    "https://snuh-seller.vercel.app",
    "https://snuh-lab.kr",
    "https://seller.snuh-lab.kr",
]


async def global_execution_handler(request: Request, exc: Exception) -> ASGIApp:
    trace = traceback.format_exc()
    print(f"{request.url.path} {status.HTTP_500_INTERNAL_SERVER_ERROR} Internal Server Error\n{trace}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": f"{exc}"
        }
    )

app = FastAPI()

app.include_router(v1_router.router)
app.mount("/static", StaticFiles(directory="./app/static"), name="static")

app.add_middleware(
    ServerErrorMiddleware,
    handler=global_execution_handler,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    GZipMiddleware,
    minimum_size=500,
    compresslevel=6
)


@app.get("/")
async def index():
    return f"Notification API (UTC: {datetime.datetime.utcnow().strftime('%Y.%m.%d %H:%M:%S')})"
