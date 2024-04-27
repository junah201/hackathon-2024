from fastapi import HTTPException as FastAPIHTTPException

ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://snuh.vercel.app",
    "https://snuh-seller.vercel.app",
    "https://snuh-lab.kr",
    "https://seller.snuh-lab.kr",
]


class HTTPException(FastAPIHTTPException):
    def __init__(self, status_code: int, detail: str = None):
        headers = {
            "Access-Control-Allow-Origin": ",".join(ALLOWED_ORIGINS),
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Credentials": "true"
        }

        super().__init__(status_code=status_code, detail=detail, headers=headers)
