# Vetpl - Backend

Backend API for software company website careers page.

## Features

- ✅ Job application submission with file upload
- ✅ Resume upload validation (PDF, DOC, DOCX)
- ✅ Application tracking with status management
- ✅ Department-based filtering
- ✅ Application statistics dashboard
- ✅ Unique application ID generation
- ✅ Spam protection (rate limiting)
- ✅ CORS configured for frontend
- ✅ PostgreSQL database integration

## Setup

### 1. Prerequisites
- Python 3.9+
- PostgreSQL

### 2. Installation

```bash
# Clone repository
git clone <repository-url>
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
cp .env.example .env
# Edit .env with your settings