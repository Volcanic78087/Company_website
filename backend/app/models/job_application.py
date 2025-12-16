from sqlalchemy import Column, Integer, String, Text, DateTime, Enum as SQLAlchemyEnum, Boolean
from sqlalchemy.sql import func
from datetime import datetime
import enum
from app.database import Base

# Define enums with all lowercase values
class JobType(str, enum.Enum):
    FULL_TIME = "full_time"
    PART_TIME = "part_time"
    CONTRACT = "contract"
    INTERNSHIP = "internship"
    REMOTE = "remote"
    HYBRID = "hybrid"

class ApplicationStatus(str, enum.Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    SHORTLISTED = "shortlisted"
    INTERVIEW_SCHEDULED = "interview_scheduled"
    REJECTED = "rejected"
    HIRED = "hired"
    WITHDRAWN = "withdrawn"

class JobApplication(Base):
    __tablename__ = "job_applications"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information (from your form)
    full_name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    linkedin_url = Column(String(500))
    github_url = Column(String(500))
    portfolio_url = Column(String(500))
    years_of_experience = Column(String(50))
    cover_letter = Column(Text)
    
    # Job Details
    job_title = Column(String(200), nullable=False)
    job_type = Column(SQLAlchemyEnum(JobType), default=JobType.FULL_TIME)
    department = Column(String(100), index=True)
    
    # Application Files
    resume_path = Column(String(500), nullable=False)
    
    # Status
    status = Column(SQLAlchemyEnum(ApplicationStatus), default=ApplicationStatus.PENDING)
    
    # System Fields
    ip_address = Column(String(50))
    user_agent = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Metadata
    application_id = Column(String(50), unique=True, index=True)
    
    def __repr__(self):
        return f"<JobApplication {self.full_name} - {self.job_title}>"