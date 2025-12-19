# models/contact.py
from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from datetime import datetime
import enum
from app.database import Base

class ContactSubject(str, enum.Enum):
    general = "general"
    sales = "sales"
    support = "support"
    career = "career"
    partnership = "partnership"

class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(30), nullable=True)
    subject = Column(Enum(ContactSubject), nullable=False, default=ContactSubject.general)
    message = Column(Text, nullable=False)
    
    # Optional: for analytics & spam prevention
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<ContactInquiry {self.name} - {self.subject}>"