from fastapi import Header, HTTPException
from app.config import APP_ACCESS_CODE


def verify_access_code(x_access_code: str = Header(default=None)):
    if not APP_ACCESS_CODE:
        raise HTTPException(
            status_code=500,
            detail="Server access code is not configured."
        )

    if x_access_code != APP_ACCESS_CODE:
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing access code."
        )

    return True