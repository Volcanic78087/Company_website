from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Request, status
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import uuid
from datetime import datetime, timedelta
import traceback

from app.database import get_db
from app.models.job_application import JobApplication, ApplicationStatus
from app.schemas.job_application import (
    JobApplicationResponse,
    JobApplicationUpdate,
    ApplicationStats
)
from app.core.config import settings
from app.core.utils import (
    save_uploaded_file, 
    generate_application_id,
    validate_file_by_extension,
    validate_file_size,
    get_client_ip,
    sanitize_filename
)
from sqlalchemy import func

router = APIRouter()

@router.post("/apply", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
async def submit_application(
    request: Request,
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    linkedin_url: Optional[str] = Form(None),
    github_url: Optional[str] = Form(None),
    portfolio_url: Optional[str] = Form(None),
    years_of_experience: Optional[str] = Form(None),
    cover_letter: Optional[str] = Form(None),
    job_title: str = Form(...),
    job_type: str = Form("full_time"),
    department: Optional[str] = Form(None),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Submit a job application with minimal fields
    """
    print(f"📥 Received application for: {job_title}")
    print(f"👤 From: {full_name} ({email})")
    
    try:
        # Check daily application limit
        today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        today_count = db.query(JobApplication).filter(
            JobApplication.email == email,
            JobApplication.created_at >= today_start
        ).count()
        
        if today_count >= settings.MAX_APPLICATIONS_PER_DAY:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Maximum {settings.MAX_APPLICATIONS_PER_DAY} applications per day allowed"
            )
        
        print(f"📄 Validating file: {resume.filename}")
        
        # Validate file by extension
        if not validate_file_by_extension(resume.filename, settings.ALLOWED_FILE_TYPES):
            print(f"❌ Invalid file type: {resume.filename}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file type. Allowed types: {', '.join(settings.ALLOWED_FILE_TYPES)}"
            )
        
        # Read file content
        print("📖 Reading file content...")
        file_content = await resume.read()
        print(f"📊 File size: {len(file_content)} bytes")
        
        # Validate file size
        if not validate_file_size(file_content, settings.MAX_UPLOAD_SIZE):
            print(f"❌ File too large: {len(file_content)} > {settings.MAX_UPLOAD_SIZE}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File too large. Maximum size: {settings.MAX_UPLOAD_SIZE / 1024 / 1024}MB"
            )
        
        # Sanitize filename
        original_filename = sanitize_filename(resume.filename)
        file_extension = os.path.splitext(original_filename)[1]
        
        # Generate unique filename
        file_name = f"{uuid.uuid4()}{file_extension}"
        print(f"💾 Saving file as: {file_name}")
        
        resume_path = save_uploaded_file(
            file_content, 
            "resumes", 
            file_name
        )
        
        # Generate unique application ID
        application_id = generate_application_id()
        
        # Create application record
        application_data = {
            "full_name": full_name,
            "email": email,
            "phone": phone,
            "linkedin_url": linkedin_url,
            "github_url": github_url,
            "portfolio_url": portfolio_url,
            "years_of_experience": years_of_experience,
            "cover_letter": cover_letter,
            "job_title": job_title,
            "job_type": job_type,
            "department": department,
            "resume_path": resume_path,
            "application_id": application_id,
            "ip_address": get_client_ip(request),
            "user_agent": request.headers.get("user-agent", ""),
            "status": ApplicationStatus.PENDING.value
        }
        
        print(f"📝 Creating database record: {application_id}")
        
        # Create database record
        db_application = JobApplication(**application_data)
        db.add(db_application)
        db.commit()
        db.refresh(db_application)
        
        print(f"✅ Application submitted: {application_id} for {job_title}")
        
        return db_application
        
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"❌ Error submitting application: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error submitting application: {str(e)}"
        )

@router.get("/applications", response_model=List[JobApplicationResponse])
async def get_applications(
    skip: int = 0,
    limit: int = 20,
    department: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get all job applications
    """
    try:
        query = db.query(JobApplication).filter(JobApplication.is_active == True)
        
        if department:
            query = query.filter(JobApplication.department == department)
        
        if status:
            query = query.filter(JobApplication.status == status)
        
        applications = query.order_by(JobApplication.created_at.desc()).offset(skip).limit(limit).all()
        return applications
        
    except Exception as e:
        print(f"❌ Error fetching applications: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching applications: {str(e)}"
        )

@router.get("/applications/{application_id}", response_model=JobApplicationResponse)
async def get_application(
    application_id: str,
    db: Session = Depends(get_db)
):
    """
    Get specific application by ID
    """
    application = db.query(JobApplication).filter(
        JobApplication.application_id == application_id,
        JobApplication.is_active == True
    ).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    return application

@router.patch("/applications/{application_id}", response_model=JobApplicationResponse)
async def update_application(
    application_id: str,
    update_data: JobApplicationUpdate,
    db: Session = Depends(get_db)
):
    """
    Update application status
    """
    application = db.query(JobApplication).filter(
        JobApplication.application_id == application_id
    ).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Update fields
    update_dict = update_data.dict(exclude_unset=True)
    for field, value in update_dict.items():
        setattr(application, field, value)
    
    application.updated_at = datetime.now()
    db.commit()
    db.refresh(application)
    
    return application

@router.get("/applications/stats", response_model=ApplicationStats)
async def get_application_stats(db: Session = Depends(get_db)):
    """
    Get application statistics
    """
    try:
        # Total count
        total = db.query(JobApplication).filter(JobApplication.is_active == True).count()
        
        # Count by status
        pending = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.PENDING.value,
            JobApplication.is_active == True
        ).count()
        
        reviewed = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.REVIEWED.value,
            JobApplication.is_active == True
        ).count()
        
        shortlisted = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.SHORTLISTED.value,
            JobApplication.is_active == True
        ).count()
        
        hired = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.HIRED.value,
            JobApplication.is_active == True
        ).count()
        
        rejected = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.REJECTED.value,
            JobApplication.is_active == True
        ).count()
        
        # Get department counts
        department_counts = {}
        departments = db.query(
            JobApplication.department, 
            func.count(JobApplication.id)
        ).filter(
            JobApplication.department.isnot(None),
            JobApplication.is_active == True
        ).group_by(JobApplication.department).all()
        
        for dept, count in departments:
            if dept:
                department_counts[dept] = count
        
        # Get total applications (same as total)
        total_applications = total
        
        # Return comprehensive stats
        return ApplicationStats(
            total=total,
            pending=pending,
            reviewed=reviewed,
            shortlisted=shortlisted,
            hired=hired,
            rejected=rejected,
            # Additional stats for frontend
            total_team_members=124,  # Hardcoded for now
            countries=18,
            employee_rating=4.8,
            total_applications=total_applications,
            open_positions=24,
            departments=department_counts
        )
        
    except Exception as e:
        print(f"❌ Error fetching statistics: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching statistics: {str(e)}"
        )
    """
    Get application statistics
    """
    try:
        # Total count
        total = db.query(JobApplication).filter(JobApplication.is_active == True).count()
        
        # Count by status
        pending = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.PENDING.value,
            JobApplication.is_active == True
        ).count()
        
        reviewed = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.REVIEWED.value,
            JobApplication.is_active == True
        ).count()
        
        shortlisted = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.SHORTLISTED.value,
            JobApplication.is_active == True
        ).count()
        
        hired = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.HIRED.value,
            JobApplication.is_active == True
        ).count()
        
        rejected = db.query(JobApplication).filter(
            JobApplication.status == ApplicationStatus.REJECTED.value,
            JobApplication.is_active == True
        ).count()
        
        return ApplicationStats(
            total=total,
            pending=pending,
            reviewed=reviewed,
            shortlisted=shortlisted,
            hired=hired,
            rejected=rejected
        )
        
    except Exception as e:
        print(f"❌ Error fetching statistics: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching statistics: {str(e)}"
        )

@router.get("/download/resume/{application_id}")
async def download_resume(
    application_id: str,
    db: Session = Depends(get_db)
):
    """
    Download resume file
    """
    application = db.query(JobApplication).filter(
        JobApplication.application_id == application_id
    ).first()
    
    if not application or not application.resume_path:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )
    
    resume_path = os.path.join(settings.UPLOAD_DIR, application.resume_path)
    
    if not os.path.exists(resume_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume file not found"
        )
    
    # Extract filename from path
    filename = os.path.basename(resume_path)
    return FileResponse(
        path=resume_path,
        filename=filename,
        media_type='application/octet-stream'
    )

@router.get("/jobs/openings")
async def get_job_openings():
    """
    Get current job openings
    """
    job_openings = [
        {
            "id": 1,
            "title": "Senior Frontend Developer",
            "department": "engineering",
            "type": "Full-time",
            "location": "Remote",
            "experience": "5+ years",
            "salary": "$12,000 - $16,000",
            "description": "Build cutting-edge user interfaces using React, TypeScript, and modern web technologies.",
            "skills": ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
            "urgent": True,
            "posted": "2 days ago"
        },
        {
            "id": 2,
            "title": "UX/UI Designer",
            "department": "design",
            "type": "Full-time",
            "location": "Remote",
            "experience": "3+ years",
            "salary": "$90,000 - $130,000",
            "description": "Create beautiful and intuitive user experiences for our product suite.",
            "skills": ["Figma", "UI/UX Design", "Prototyping", "User Research", "Design Systems"],
            "urgent": False,
            "posted": "1 week ago"
        },
    ]
    
    return job_openings

@router.get("/departments")
async def get_departments(db: Session = Depends(get_db)):
    """
    Get unique departments from applications
    """
    departments = db.query(JobApplication.department).filter(
        JobApplication.department.isnot(None),
        JobApplication.is_active == True
    ).distinct().all()
    
    return [dept[0] for dept in departments if dept[0]]