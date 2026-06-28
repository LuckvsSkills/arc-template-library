// cart.js — Ecommerce Winkelwagen
// ARC AI Agents Website Fabriek

let products = [];
let cart = [];

async function loadData() {
    const res = await fetch('../data/products.json');
    const data = await res.json();
    products = data.producten;
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-image-placeholder"></div>
            <h3>${p.naam}</h3>
            <p class="product-desc">${p.beschrijving}</p>
            <div class="product-footer">
                <span class="product-price">€${p.prijs.toFixed(2).replace('.', ',')}</span>
                ${p.voorraad > 0
                    ? (p.voorraad <= 3
                        ? `<span class="badge badge-laag">Nog ${p.voorraad} op voorraad</span>`
                        : `<span class="badge badge-voorraad">Op voorraad</span>`)
                    : `<span class="badge badge-uit">Uitverkocht</span>`
                }
            </div>
            <button class="btn-primary btn-add" data-id="${p.id}" ${p.voorraad <= 0 ? 'disabled' : ''}>
                Toevoegen
            </button>
        </div>
    `).join('');

    grid.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', () => addToCart(btn.dataset.id));
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    const inCart = existing ? existing.aantal : 0;

    if (inCart >= product.voorraad) {
        alert('Maximale voorraad bereikt voor dit product.');
        return;
    }

    if (existing) {
        existing.aantal += 1;
    } else {
        cart.push({ ...product, aantal: 1 });
    }
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (delta > 0 && item.aantal >= item.voorraad) {
        alert('Maximale voorraad bereikt voor dit product.');
        return;
    }

    item.aantal += delta;
    if (item.aantal <= 0) {
        removeFromCart(id);
    } else {
        renderCart();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    const totalCount = cart.reduce((sum, i) => sum + i.aantal, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.prijs * i.aantal, 0);

    cartCount.textContent = totalCount;
    cartTotal.textContent = `€${totalPrice.toFixed(2).replace('.', ',')}`;

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <strong>${item.naam}</strong>
                <span>€${item.prijs.toFixed(2).replace('.', ',')} x ${item.aantal}</span>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity('${item.id}', -1)">-</button>
                <span>${item.aantal}</span>
                <button onclick="updateQuantity('${item.id}', 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">&times;</button>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();

    document.getElementById('cartToggle').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.toggle('open');
    });

    document.getElementById('cartClose').addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Je winkelwagen is leeg.');
            return;
        }
        const summary = cart.map(i => `${i.aantal}x ${i.naam}`).join('\n');
        const total = cart.reduce((s,i)=>s+i.prijs*i.aantal,0).toFixed(2).replace('.',',');
        alert(`Bestelling overzicht:\n\n${summary}\n\nTotaal: €${total}\n\n(Dit is een demo — koppel hier je betaalprovider)`);
    });
});
