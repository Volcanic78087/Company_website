from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, Boolean, JSON
from sqlalchemy.sql import func
from datetime import datetime
import enum
from app.database import Base
from sqlalchemy.dialects.postgresql import JSONB


class ProjectStatus(str, enum.Enum):
    NEW = "new"
    REVIEWED = "reviewed"
    CONTACTED = "contacted"
    PROPOSAL_SENT = "proposal_sent"
    NEGOTIATION = "negotiation"
    APPROVED = "approved"
    REJECTED = "rejected"
    CANCELLED = "cancelled"

class ProjectRequest(Base):
    __tablename__ = "project_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Project Information
    project_id = Column(String(50), unique=True, index=True, nullable=False)
    project_type = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    budget = Column(String(100))
    timeline = Column(String(100))
    technologies = Column(JSONB, nullable=True)  # JSON string of selected technologies
    
    # Client Information
    full_name = Column(String(200), nullable=False)
    email = Column(String(200), nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    company = Column(String(200))
    
    # Files
    attached_files = Column(JSONB, nullable=True)# JSON string of file information
    
    # Status
    status = Column(Enum(ProjectStatus), default=ProjectStatus.NEW)
    notes = Column(Text)
    
    # System Fields
    ip_address = Column(String(50))
    user_agent = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<ProjectRequest {self.project_id} - {self.full_name}>"