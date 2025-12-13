#!/usr/bin/env python3
"""
Database initialization script
"""
import sys
import os

# Add the app directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine
from app.models.job_application import Base
from app.core.config import settings

def init_database():
    """
    Initialize the database by creating all tables
    """
    print("Creating database tables...")
    
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
        
        print("\n📊 Database Information:")
        print(f"   Database URL: {settings.DATABASE_URL}")
        print(f"   Tables created: {list(Base.metadata.tables.keys())}")
        
    except Exception as e:
        print(f"❌ Error creating database tables: {e}")
        sys.exit(1)

if __name__ == "__main__":
    init_database()