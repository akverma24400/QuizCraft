from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "QuizCraft AI"
    APP_VERSION: str = "1.0.0"

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    GROQ_API_KEY: str
    MODEL_NAME: str = "llama3-70b-8192"

    MAX_FILE_SIZE: int = 10 * 1024 * 1024

    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
    ]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()