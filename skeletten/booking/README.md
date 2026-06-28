# {{PROJECT_NAAM}}

{{PROJECT_BESCHRIJVING}}

## Structuur
- `frontend/` — index.html (booking-stappen), booking.js (tijdslot-logica)
- `styles/` — CSS (theme.css automatisch gegenereerd per stijl)
- `data/services.json` — diensten en openingstijden

## Functionaliteit
- Dienst kiezen → datum kiezen → tijdslot kiezen → bevestigen
- Automatische tijdslot-generatie op basis van openingstijden + interval
- Gesloten weekdagen worden geblokkeerd in de datumkiezer

## Admin: diensten en openingstijden beheren
Bewerk `data/services.json`. `gesloten_weekdagen`: 0=zondag ... 6=zaterdag.

## Gegenereerd door
ARC AI Agents Website Fabriek — Forge
