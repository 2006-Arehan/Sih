import os
from pydantic_settings import BaseSettings

class Settings:
    PROJECT_NAME: str = "SIH 134 Skill Development & LMI Platform (Maharashtra)"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./sih134_lmi.db")

settings = Settings()
