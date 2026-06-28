// marketplace.js — Marketplace listings + categorie-filter
// ARC AI Agents Website Fabriek

let listings = [];
let categorieen = [];
let activeCategory = 'alle';

async function loadData() {
    const res = await fetch('../data/listings.json');
    const data = await res.json();
    listings = data.listings;
    categorieen = data.categorieen;
    renderFilters();
    renderListings();
}

function renderFilters() {
    const container = document.getElementById('categoryFilters');
    container.innerHTML = categorieen.map(cat => `
        <button class="filter-btn" data-cat="${cat}">${cat}</button>
    `).join('');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.cat;
            renderListings();
        });
    });
}

function renderListings() {
    const grid = document.getElementById('listingGrid');
    const filtered = activeCategory === 'alle'
        ? listings
        : listings.filter(l => l.categorie === activeCategory);

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="empty">Geen aanbiedingen gevonden in deze categorie.</p>';
        return;
    }

    grid.innerHTML = filtered.map(l => `
        <div class="listing-card">
            <div class="listing-image-placeholder"></div>
            <div class="listing-content">
                <span class="listing-category">${l.categorie}</span>
                <h3>${l.titel}</h3>
                <p class="listing-desc">${l.beschrijving}</p>
                <div class="listing-footer">
                    <span class="listing-price">€${l.prijs.toFixed(2).replace('.', ',')}</span>
                    <span class="listing-seller">${l.verkoper} — ${l.locatie}</span>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();

    document.querySelector('.filter-btn[data-cat="alle"]').addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-cat="alle"]').classList.add('active');
        activeCategory = 'alle';
        renderListings();
    });
});
