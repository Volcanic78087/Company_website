# schemas/contact.py
from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime
import re

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str  # "general", "sales", etc.
    message: str

    @validator('phone')
    def validate_phone(cls, v):
        if not v:
            return v
        cleaned = re.sub(r'[^\d\+]', '', v)
        if len(cleaned) < 10 or len(cleaned) > 16:
            raise ValueError('Invalid phone number')
        return v

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    subject: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True