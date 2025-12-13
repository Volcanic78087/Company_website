from pydantic_settings import BaseSettings
from typing import List
import os
from pathlib import Path

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Vetpl"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str
    
    # CORS
    FRONTEND_URL: str = "http://localhost:5173"
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
    ]
    
    # File Upload
    MAX_UPLOAD_SIZE: int = 5242880  # 5MB
    ALLOWED_FILE_TYPES_STR:str = ".pdf, .doc, .docx"
    ALLOWED_IMAGE_TYPES_STR: str = ".jpg,.jpeg,.png,.gif,.webp"
    UPLOAD_DIR: Path = Path("./uploads")
    MAX_FILE_NAME_LENGTH: int = 255
    
    # Application Settings
    MAX_APPLICATIONS_PER_DAY: int = 3  # Prevent spam
    DEFAULT_PAGE_SIZE: int = 20
    
 # Parsed properties (getters)
    @property
    def ALLOWED_FILE_TYPES(self) -> List[str]:
        return [ext.strip() for ext in self.ALLOWED_FILE_TYPES_STR.split(",") if ext.strip()]
    
    @property
    def ALLOWED_IMAGE_TYPES(self) -> List[str]:
        return [ext.strip() for ext in self.ALLOWED_IMAGE_TYPES_STR.split(",") if ext.strip()]
    
    class Config:
        env_file = ".env"
        case_sensitive = True
       
        env_parse_enums = True

settings = Settings()

# Create directories if they don't exist
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
(settings.UPLOAD_DIR / "resumes").mkdir(parents=True, exist_ok=True)
(settings.UPLOAD_DIR / "images").mkdir(parents=True, exist_ok=True)