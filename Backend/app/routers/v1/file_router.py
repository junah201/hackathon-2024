from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.utils import aws_s3
from app.common.config import AWS_S3_BUCKET_NAME

from typing import List

router = APIRouter(
    prefix="/file",
)


@router.post("")
async def upload_files(files: List[UploadFile]):
    filenames: List[str] = list()
    for file in files:
        filenames.append(aws_s3.upload_file(file, ""))

    return filenames


@router.get("/{filename}", response_class=RedirectResponse)
async def download_file(filename: str):
    return RedirectResponse(f"https://{AWS_S3_BUCKET_NAME}.ap-northeast-2.amazonaws.com/upload/{filename}")


@router.delete("/{filename}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_file(filename: str):
    aws_s3.delete_file(filename, "upload")
