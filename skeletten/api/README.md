# {{PROJECT_NAAM}}

{{PROJECT_BESCHRIJVING}}

## Structuur
- `frontend/` — index.html (API documentatie-pagina)
- `styles/` — CSS (theme.css automatisch gegenereerd per stijl)
- `backend/` — FastAPI skeleton (main.py, requirements.txt, .env.example)

## Backend starten
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API draait op `http://localhost:8000`. Interactieve docs op `/docs` (Swagger) en `/redoc`.

## Endpoints (voorbeeld)
- `GET /items` — lijst van items
- `GET /items/{id}` — specifiek item
- `POST /items` — nieuw item aanmaken
- `DELETE /items/{id}` — item verwijderen

## Uitbreiden
Vervang de in-memory `items_db` door een echte database (PostgreSQL, MongoDB, etc.) en voeg authenticatie toe waar nodig.

## Gegenereerd door
ARC AI Agents Website Fabriek — Forge
