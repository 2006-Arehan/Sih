import hashlib
import secrets
import base64
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import User
from app.schemas.schemas import UserCreate, UserLogin, UserResponse, TokenResponse

router = APIRouter(tags=["Authentication"])

def hash_password(password: str, salt: Optional[str] = None) -> str:
    if not salt:
        salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    b64_str = base64.b64encode(hashed).decode("utf-8")
    return f"{salt}${b64_str}"

def verify_password(password: str, hashed_password: str) -> bool:
    try:
        salt, _ = hashed_password.split("$", 1)
        return hash_password(password, salt) == hashed_password
    except Exception:
        return False

def generate_access_token(email: str, role: str) -> str:
    raw = f"{email}:{role}:{secrets.token_hex(8)}"
    return base64.b64encode(raw.encode("utf-8")).decode("utf-8")

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_211_CREATED if hasattr(status, "HTTP_211_CREATED") else status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email.ilike(user_in.email.strip())).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists."
        )

    user = User(
        email=user_in.email.strip().lower(),
        hashed_password=hash_password(user_in.password),
        full_name=user_in.full_name or user_in.email.split("@")[0].title(),
        role=user_in.role or "student",
        organization=user_in.organization,
        district_name=user_in.district_name,
        is_active=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = generate_access_token(user.email, user.role)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )

@router.post("/login", response_model=TokenResponse)
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email.ilike(credentials.email.strip())).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Please check your credentials."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated. Please contact administrator."
        )

    token = generate_access_token(user.email, user.role)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(email: Optional[str] = None, db: Session = Depends(get_db)):
    if not email:
        user = db.query(User).first()
    else:
        user = db.query(User).filter(User.email.ilike(email.strip())).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return UserResponse.model_validate(user)
