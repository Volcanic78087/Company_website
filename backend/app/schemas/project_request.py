from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
import json

class ProjectStatus(str, Enum):
    NEW = "new"
    REVIEWED = "reviewed"
    CONTACTED = "contacted"
    PROPOSAL_SENT = "proposal_sent"
    NEGOTIATION = "negotiation"
    APPROVED = "approved"
    REJECTED = "rejected"
    CANCELLED = "cancelled"

class ProjectRequestCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=50)
    company: Optional[str] = None
    project_type: str = Field(..., min_length=2, max_length=200)
    budget: Optional[str] = None
    timeline: Optional[str] = None
    description: str = Field(..., min_length=50, max_length=5000)
    technologies: List[str] = []

    # Create के समय technologies string से parse करने के लिए (frontend JSON string भेजता है)
    @field_validator("technologies", mode="before")
    @classmethod
    def parse_technologies_create(cls, value):
        if isinstance(value, str):
            try:
                parsed = json.loads(value)
                return parsed if isinstance(parsed, list) else []
            except json.JSONDecodeError:
                return []
        return value if isinstance(value, list) else []

class ProjectRequestResponse(BaseModel):
    id: int
    project_id: str
    full_name: str
    email: str
    phone: str
    company: Optional[str]
    project_type: str
    budget: Optional[str]
    timeline: Optional[str]
    description: str
    technologies: List[str]
    attached_files: Optional[List[Dict[str, Any]]] = None
    status: ProjectStatus
    notes: Optional[str] = None
    created_at: datetime

    @field_validator("technologies", "attached_files", mode="before")
    @classmethod
    def parse_json_fields(cls, value, info):
        field_name = info.field_name

        # अगर value already list/dict है (या None), तो वैसा ही return करो
        if value is None:
            return None if field_name == "attached_files" else []
        if not isinstance(value, str):
            return value

        # String है → JSON parse करो
        try:
            parsed = json.loads(value)

            if field_name == "technologies":
                return parsed if isinstance(parsed, list) else []
            elif field_name == "attached_files":
                return parsed if isinstance(parsed, list) else []

        except json.JSONDecodeError:
            pass  # नीचे default return

        # Parse fail → default safe value
        if field_name == "technologies":
            return []
        elif field_name == "attached_files":
            return []  # या None अगर Optional है

        return value

    model_config = {"from_attributes": True}  # Pydantic V2 style (Config class deprecated)

class ProjectRequestUpdate(BaseModel):
    status: Optional[ProjectStatus] = None
    notes: Optional[str] = None