import os

DATABASE_URL = os.environ.get("DATABASE_URL")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ACCESS_TOKEN_EXPIRES_IN = 180
JWT_ALGORITHM = "HS256"
AWS_ACCESS_KEY_ID = os.environ.get("AWS__ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS__SECRET_ACCESS_KEY")
AWS_S3_BUCKET_NAME = "decompiler-hackathon-2024--cdn"
