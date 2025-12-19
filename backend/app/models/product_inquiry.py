from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.database import Base

class ProductInquiry(Base):
    __tablename__ = "product_inquiries"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    company = Column(String(100), nullable=False)
    product = Column(String(100), nullable=False)
    message = Column(Text)
    
    # Additional fields
    status = Column(String(20), default="pending")  # pending, contacted, closed
    priority = Column(String(10), default="medium")  # low, medium, high
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Tracking
    ip_address = Column(String(45))
    user_agent = Column(Text)
    source = Column(String(50), default="website")  # website, mobile, api

class FreeTrialRequest(Base):
    __tablename__ = "free_trial_requests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=False)
    company = Column(String, nullable=False)
    employees = Column(String)
    interested_in = Column(String)
    timeline = Column(String)
    status = Column(String, nullable=False, default="pending")
    
    # ← YE DO LINES ADD KARO
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())