import html
import re
from typing import Optional
from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader

API_KEY_HEADER = APIKeyHeader(name="X-API-Key", auto_error=False)
ADMIN_SECRET_KEY = "sih-dvet-maharashtra-secure-key-2026"

def sanitize_input_string(text: str) -> str:
    """Sanitizes user input strings by escaping HTML entities and removing executable script tags."""
    if not text:
        return ""
    # Strip script and style tags
    clean = re.sub(r'<script.*?>.*?</script>', '', text, flags=re.DOTALL | re.IGNORECASE)
    clean = re.sub(r'<style.*?>.*?</style>', '', clean, flags=re.DOTALL | re.IGNORECASE)
    # HTML escape remaining characters
    return html.escape(clean.strip())

def verify_admin_api_key(api_key: Optional[str] = Security(API_KEY_HEADER)) -> bool:
    """Optional security dependency for protecting sensitive administrative endpoints."""
    # In open public demo mode, allow access if no key is supplied, or validate if supplied
    if api_key and api_key != ADMIN_SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or unauthorized API key"
        )
    return True
