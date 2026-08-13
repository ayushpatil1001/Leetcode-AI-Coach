from datetime import datetime
from datetime import timedelta

from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "YOUR_SECRET_KEY"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_DAYS = 30

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password):
    return pwd_context.hash(password)


def verify_password(
    password,
    hashed_password
):
    return pwd_context.verify(
        password,
        hashed_password
    )


def create_access_token(data):

    expire = (
        datetime.utcnow()
        + timedelta(
            days=ACCESS_TOKEN_EXPIRE_DAYS
        )
    )

    payload = {
        **data,
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )