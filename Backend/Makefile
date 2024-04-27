.PHONY: run
run:
	poetry run uvicorn --reload app.main:app

.PHONY: dev
dev:
	poetry run uvicorn --reload app.main:app

.PHONY: migrate
migrate:
	poetry run alembic revision --autogenerate && poetry run alembic upgrade head

.PHONY: install
install:
	pip install -U poetry && poetry install

.PHONY: update
update:
	poetry update
