from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.api import api_router
from app.core.config import settings
from app.middleware.request_logger import RequestLoggerMiddleware
from app.middleware.exception_handler import (
    http_exception_handler,
    validation_exception_handler,
    global_exception_handler
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"{settings.APP_NAME} Started")
    yield
    print(f"{settings.APP_NAME} Stopped")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(RequestLoggerMiddleware)

app.add_exception_handler(
    StarletteHTTPException,
    http_exception_handler
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

app.add_exception_handler(
    Exception,
    global_exception_handler
)

app.include_router(api_router)


@app.get("/")
async def root():
    return {
        "success": True,
        "message": "Welcome to QuizCraft AI"
    }