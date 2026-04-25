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
*Here is a quick playback of the core pillars to ensure we are operating on the exact same wavelength:

Deployment & Tenancy: Single-tenant (instance-per-client) via automated Docker containers. This ensures zero data bleed between schools, easy white-labeling, and a 1-click "spin-up" process for new clients.
Tech Stack & Scalability: React (Frontend), Django/DRF (Backend), PostgreSQL + PgBouncer (DB). You are heavily relying on Redis (for caching read-heavy dashboards and buffering concurrent write-heavy exam states) and Celery (to offload heavy background tasks like video processing and bulk messaging). This is exactly how you survive 2,000+ concurrent users.
Modularity (The 70/30 Rule): The backend will be decoupled into distinct, pluggable apps (core_tenant, users_auth, lms_academics, assessments, communications). This allows you to toggle features on/off depending on a client's subscription tier or specific needs, fulfilling the 30% customization requirement effortlessly.
Relating this to your current codebase: Looking at the files you've shared (specifically models.py, views.py, and serializers.py inside backend/app/), you have a fantastic foundational monolith right now. You already have the core entities: CustomUser, Course, Project, Assignment, and Exam.

To achieve your blueprint, our roadmap will involve evolving this monolithic app into the decoupled architecture you described, introducing core_tenant for branding/toggles, and wiring up the Celery + Redis infrastructure for async tasks and advanced caching (beyond the basic @cache_page and cache.set you currently have in your views).

How would you like to begin executing this blueprint? Here are a few logical starting points:

Phase 1 (Refactoring): Break down the current monolithic app into your target modular apps (users_auth, lms_academics, assessments, communications).
Phase 2 (The Core): Build the core_tenant app to establish the white-labeling foundation (Institute Profiles, Feature Toggles, Branding).
Phase 3 (Infrastructure): Dockerize the current setup and integrate Celery + Redis to establish the scalable infrastructure baseline before writing more feature code.*