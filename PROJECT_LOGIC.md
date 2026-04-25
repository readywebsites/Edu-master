# Project Logic & Setup Notes

## Architecture Overview
This is a containerized application utilizing:
- **Django / Python** for the main backend API/Web server.
- **Celery** for asynchronous background task processing.
- **Redis** acting as the message broker for Celery, the Celery result backend, and the primary application cache.

## Docker Compose Services
1. **`redis`**: Uses `redis:7-alpine`, exposed on port `6379`.
2. **`web`**: Builds from `./backend`, runs the Django dev server on port `8000`. Connects to Redis for caching and Celery brokering.
3. **`celery`**: Builds from `./backend`, runs the Celery worker for the `education` app. Depends on both the `web` and `redis` services.

## Environment Variables Setup
- `CELERY_BROKER_URL=redis://redis:6379/0`
- `CELERY_RESULT_BACKEND=redis://redis:6379/0`
- `CACHE_URL=redis://redis:6379/1`

## Important Chat Notes & Logic
*(Paste any important explanations, scripts, or logic we discussed here so you have a permanent record of it!)*