from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime
import re

class ProductInquiryBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: str
    product: str
    message: Optional[str] = None
    
    @validator('phone')
    def validate_phone(cls, v):
        # Basic phone validation
        phone_regex = r'^[\+]?[1-9][\d]{0,15}$'
        if not re.match(phone_regex, v.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")):
            raise ValueError('Invalid phone number format')
        return v

class ProductInquiryCreate(BaseModel):
    name: str
    email: str
    phone: str
    company: str
    product: str
    message: Optional[str] = None

class ProductInquiryUpdate(BaseModel):
    status: Optional[str] = None
    priority: Optional[str] = None

class ProductInquiryResponse(ProductInquiryBase):
    id: int
    status: str
    priority: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class FreeTrialBase(BaseModel):
    name: str
    email: EmailStr        # ← EmailStr yahan rakho
    phone: str
    company: str
    employees: Optional[str] = None
    interested_in: Optional[str] = None
    timeline: Optional[str] = None

    @validator('phone')
    def validate_phone(cls, v):
        if not v:
            return v
        cleaned = re.sub(r'[^\d\+]', '', v)
        phone_regex = r'^[\+]?[1-9][\d]{0,15}$'
        if not re.match(phone_regex, cleaned):
            raise ValueError('Invalid phone number format')
        return v


class FreeTrialCreate(FreeTrialBase):
    pass  # Sab kuch inherit ho jaayega including EmailStr aur validator


class FreeTrialUpdate(BaseModel):
    status: Optional[str] = None
    trial_start_date: Optional[datetime] = None
    trial_end_date: Optional[datetime] = None


class FreeTrialResponse(FreeTrialBase):
    id: int
    status: str
    ip_address: Optional[str] = None       
    user_agent: Optional[str] = None        
    trial_start_date: Optional[datetime] = None
    trial_end_date: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True