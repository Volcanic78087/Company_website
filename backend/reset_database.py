# reset_database.py
import sqlalchemy as sa
from app.database import engine
import psycopg2

def reset_database_completely():
    print("🧹 COMPLETELY RESETTING DATABASE...")
    
    # Connection string
    conn_str = "postgresql://postgres:root@localhost:5432/vetpl_db"
    
    try:
        # Connect directly with psycopg2 for DDL operations
        conn = psycopg2.connect(conn_str)
        conn.autocommit = True
        cursor = conn.cursor()
        
        # 1. Drop the table if it exists
        print("1. Dropping job_applications table...")
        cursor.execute("DROP TABLE IF EXISTS job_applications CASCADE;")
        
        # 2. Drop the enum type if it exists
        print("2. Dropping jobtype enum...")
        cursor.execute("DROP TYPE IF EXISTS jobtype CASCADE;")
        
        # 3. Drop the status enum if it exists
        print("3. Dropping applicationstatus enum...")
        cursor.execute("DROP TYPE IF EXISTS applicationstatus CASCADE;")
        
        cursor.close()
        conn.close()
        
        print("✅ Database cleaned successfully!")
        
    except Exception as e:
        print(f"❌ Error cleaning database: {e}")
        return False
    
    return True

def create_new_tables():
    print("\n🔄 Creating new tables...")
    
    try:
        from app.database import Base
        from app.models.job_application import JobApplication
        
        # Import all models
        import app.models
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        
        print("✅ Tables created successfully!")
        
        # Verify
        inspector = sa.inspect(engine)
        tables = inspector.get_table_names()
        
        print(f"\n📊 Tables in database: {tables}")
        
        if 'job_applications' in tables:
            columns = inspector.get_columns('job_applications')
            print(f"\n📋 Columns in job_applications:")
            for col in columns:
                print(f"  {col['name']}: {col['type']}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        import traceback
        traceback.print_exc()
        return False

def verify_fix():
    print("\n🧪 Testing the fix...")
    
    # Create a test insertion
    from app.database import SessionLocal
    from app.models.job_application import JobApplication
    import uuid
    from datetime import datetime
    
    db = SessionLocal()
    
    try:
        test_data = {
            "full_name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "job_title": "Developer",
            "job_type": "full_time",  # This should work now
            "department": "engineering",
            "resume_path": "test.pdf",
            "application_id": f"TEST-{uuid.uuid4().hex[:8]}",
            "status": "pending"
        }
        
        app = JobApplication(**test_data)
        db.add(app)
        db.commit()
        db.refresh(app)
        
        print(f"✅ Test insertion successful! ID: {app.id}")
        print(f"   Job type saved as: '{app.job_type}'")
        print(f"   Status saved as: '{app.status}'")
        
        # Clean up test record
        db.delete(app)
        db.commit()
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        db.rollback()
        return False
    finally:
        db.close()

def main():
    print("=" * 60)
    print("DATABASE RESET AND FIX SCRIPT")
    print("=" * 60)
    
    # Step 1: Reset database
    if not reset_database_completely():
        print("\n❌ Failed to reset database")
        return
    
    # Step 2: Create new tables
    if not create_new_tables():
        print("\n❌ Failed to create tables")
        return
    
    # Step 3: Verify
    if not verify_fix():
        print("\n❌ Verification failed")
        return
    
    print("\n" + "=" * 60)
    print("🎉 SUCCESS! Database is now fixed.")
    print("You can now run your backend:")
    print("python app/main.py")
    print("=" * 60)

if __name__ == "__main__":
    main()