from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )

    # =====================
    # Profile Information
    # =====================

    avatar_url = Column(
        String,
        nullable=True
    )

    banner_url = Column(
        String,
        nullable=True
    )

    headline = Column(
        String,
        nullable=True
    )

    bio = Column(
        Text,
        nullable=True
    )

    phone = Column(
        String,
        nullable=True
    )

    location = Column(
        String,
        nullable=True
    )

    university = Column(
        String,
        nullable=True
    )

    degree = Column(
        String,
        nullable=True
    )

    graduation_year = Column(
        String,
        nullable=True
    )

    github_username = Column(
        String,
        nullable=True
    )

    leetcode_username = Column(
        String,
        nullable=True
    )

    linkedin_url = Column(
        String,
        nullable=True
    )

    portfolio_url = Column(
        String,
        nullable=True
    )

    skills = Column(
        Text,
        nullable=True
    )

    interests = Column(
        Text,
        nullable=True
    )