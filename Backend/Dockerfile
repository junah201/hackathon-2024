FROM python:3.10-slim-buster
EXPOSE 80 443 22 8080

RUN pip3 install poetry
COPY pyproject.toml pyproject.toml
COPY poetry.lock poetry.lock
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev
COPY . .

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--ssl-keyfile", "./host/home/ubuntu/certificates/privkey.pem", "--ssl-certfile", "./host/home/ubuntu/certificates/fullchain.pem"]
