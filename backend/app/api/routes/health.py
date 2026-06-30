from datetime import datetime

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()


@router.get("/")
async def health_check():

    return {
        "success": True,
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "Healthy",
        "timestamp": datetime.utcnow().isoformat()
    }


@router.get("/ping")
async def ping():

    return {
        "message": "pong"
    }