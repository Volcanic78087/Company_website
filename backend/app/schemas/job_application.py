from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime
from enum import Enum

# Define enums with all lowercase values
class JobType(str, Enum):
    FULL_TIME = "full_time"
    PART_TIME = "part_time"
    CONTRACT = "contract"
    INTERNSHIP = "internship"
    REMOTE = "remote"
    HYBRID = "hybrid"

class ApplicationStatus(str, Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    SHORTLISTED = "shortlisted"
    INTERVIEW_SCHEDULED = "interview_scheduled"
    REJECTED = "rejected"
    HIRED = "hired"
    WITHDRAWN = "withdrawn"

# Schema for creating application (from frontend)
class JobApplicationCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=50)
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    years_of_experience: Optional[str] = None
    cover_letter: Optional[str] = None
    job_title: str = Field(..., min_length=2, max_length=200)
    job_type: JobType = JobType.FULL_TIME
    department: Optional[str] = None

# Schema for response
class JobApplicationResponse(BaseModel):
    id: int
    application_id: str
    full_name: str
    email: str
    phone: str
    linkedin_url: Optional[str]
    github_url: Optional[str]
    portfolio_url: Optional[str]
    years_of_experience: Optional[str]
    cover_letter: Optional[str]
    job_title: str
    job_type: JobType
    department: Optional[str]
    resume_path: str
    status: ApplicationStatus
    created_at: datetime
    
    class Config:
        from_attributes = True

# Schema for updating application
class JobApplicationUpdate(BaseModel):
    status: Optional[ApplicationStatus] = None
    department: Optional[str] = None

# Schema for statistics
class ApplicationStats(BaseModel):
    total: int
    pending: int
    reviewed: int
    shortlisted: int
    hired: int
    rejected: int