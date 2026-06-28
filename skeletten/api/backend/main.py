"""
{{PROJECT_NAAM}} — API Backend
Gegenereerd door ARC AI Agents Website Fabriek — Forge
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="{{PROJECT_NAAM}}",
    description="{{PROJECT_BESCHRIJVING}}",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class Item(BaseModel):
    id: Optional[int] = None
    naam: str
    beschrijving: Optional[str] = None

# --- In-memory data store (vervang door database) ---
items_db = [
    {"id": 1, "naam": "Voorbeeld item 1", "beschrijving": "Eerste voorbeeld"},
    {"id": 2, "naam": "Voorbeeld item 2", "beschrijving": "Tweede voorbeeld"},
]

# --- Endpoints ---
@app.get("/")
def root():
    return {"message": "Welkom bij de {{PROJECT_NAAM}} API", "docs": "/docs"}

@app.get("/items")
def get_items():
    return items_db

@app.get("/items/{item_id}")
def get_item(item_id: int):
    for item in items_db:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item niet gevonden")

@app.post("/items")
def create_item(item: Item):
    new_id = max([i["id"] for i in items_db], default=0) + 1
    new_item = {"id": new_id, "naam": item.naam, "beschrijving": item.beschrijving}
    items_db.append(new_item)
    return new_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    global items_db
    items_db = [i for i in items_db if i["id"] != item_id]
    return {"message": "Item verwijderd"}
