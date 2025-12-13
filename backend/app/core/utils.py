"""
Utility functions for the application
"""
import os
import uuid
import re
from datetime import datetime
from typing import List
import aiofiles
from pathlib import Path
from app.core.config import settings

def save_uploaded_file(file_content: bytes, subdirectory: str, filename: str) -> str:
    """
    Save uploaded file to disk
    """
    # Create directory if it doesn't exist
    save_dir = settings.UPLOAD_DIR / subdirectory
    save_dir.mkdir(parents=True, exist_ok=True)
    
    # Save file
    file_path = save_dir / filename
    
    with open(file_path, 'wb') as f:
        f.write(file_content)
    
    # Return relative path
    return f"{subdirectory}/{filename}"

async def save_uploaded_file_async(file_content: bytes, subdirectory: str, filename: str) -> str:
    """
    Save uploaded file asynchronously
    """
    # Create directory if it doesn't exist
    save_dir = settings.UPLOAD_DIR / subdirectory
    save_dir.mkdir(parents=True, exist_ok=True)
    
    # Save file
    file_path = save_dir / filename
    
    async with aiofiles.open(file_path, 'wb') as f:
        await f.write(file_content)
    
    # Return relative path
    return f"{subdirectory}/{filename}"

def validate_file_by_extension(filename: str, allowed_extensions: List[str]) -> bool:
    """
    Validate file by extension
    """
    if not filename:
        return False
    
    # Get file extension
    _, extension = os.path.splitext(filename.lower())
    
    # Check if extension is in allowed list
    return extension in allowed_extensions

def validate_file_size(file_content: bytes, max_size: int) -> bool:
    """
    Validate file size
    """
    return len(file_content) <= max_size

def generate_application_id() -> str:
    """
    Generate unique application ID
    Format: APP-YYYYMMDD-XXXXX
    """
    date_str = datetime.now().strftime("%Y%m%d")
    random_str = uuid.uuid4().hex[:5].upper()
    return f"APP-{date_str}-{random_str}"

def get_client_ip(request):
    """
    Get client IP address
    """
    if request.client:
        return request.client.host
    return None

def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename to prevent path traversal
    """
    if not filename:
        return "unnamed_file"
    
    # Remove directory components
    filename = os.path.basename(filename)
    
    # Remove special characters (keep only alphanumeric, dots, hyphens, underscores)
    filename = re.sub(r'[^\w\-\.]', '_', filename)
    
    # Limit length
    if len(filename) > settings.MAX_FILE_NAME_LENGTH:
        name, ext = os.path.splitext(filename)
        filename = name[:settings.MAX_FILE_NAME_LENGTH - len(ext)] + ext
    
    return filename

def format_file_size(bytes: int) -> str:
    """
    Format file size in human readable format
    """
    if bytes == 0:
        return "0 Bytes"
    
    units = ['Bytes', 'KB', 'MB', 'GB']
    i = 0
    while bytes >= 1024 and i < len(units) - 1:
        bytes /= 1024
        i += 1
    
    return f"{bytes:.2f} {units[i]}"

def get_file_extension(filename: str) -> str:
    """
    Get file extension from filename
    """
    return os.path.splitext(filename)[1].lower()

def is_valid_email(email: str) -> bool:
    """
    Basic email validation
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def is_valid_phone(phone: str) -> bool:
    """
    Basic phone number validation
    """
    # Allow digits, spaces, plus, hyphen, parentheses
    pattern = r'^[\d\s\+\-\(\)]{10,20}$'
    return bool(re.match(pattern, phone))

def create_directories():
    """
    Create necessary directories
    """
    # Main upload directory
    settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    
    # Subdirectories
    (settings.UPLOAD_DIR / "resumes").mkdir(parents=True, exist_ok=True)
    (settings.UPLOAD_DIR / "images").mkdir(parents=True, exist_ok=True)
    
    print(f"📁 Directories created at: {settings.UPLOAD_DIR.absolute()}")

# Create directories on import
create_directories()