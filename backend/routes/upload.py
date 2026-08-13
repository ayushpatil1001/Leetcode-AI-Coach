from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

import os
import uuid

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

@router.post("/avatar")
async def upload_avatar(
    file: UploadFile = File(...)
):

    ext = file.filename.split(".")[-1]

    filename = (
        f"{uuid.uuid4()}.{ext}"
    )

    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    with open(
        filepath,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    return {
        "url":
            f"/uploads/{filename}"
    }


@router.post("/banner")
async def upload_banner(
    file: UploadFile = File(...)
):

    ext = file.filename.split(".")[-1]

    filename = (
        f"banner_{uuid.uuid4()}.{ext}"
    )

    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    with open(
        filepath,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    return {
        "url":
            f"/uploads/{filename}"
    }