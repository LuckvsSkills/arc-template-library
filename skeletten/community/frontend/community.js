// community.js — Community topics + categorie-filter
// ARC AI Agents Website Fabriek

let topics = [];
let categorieen = [];
let activeCategory = 'alle';

async function loadData() {
    const res = await fetch('../data/topics.json');
    const data = await res.json();
    topics = data.topics;
    categorieen = data.categorieen;
    renderFilters();
    renderTopics();
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
            renderTopics();
        });
    });
}

function renderTopics() {
    const list = document.getElementById('topicList');
    const filtered = activeCategory === 'alle'
        ? topics
        : topics.filter(t => t.categorie === activeCategory);

    if (filtered.length === 0) {
        list.innerHTML = '<p class="empty">Geen topics gevonden in deze categorie.</p>';
        return;
    }

    list.innerHTML = filtered.map(t => `
        <div class="topic-row">
            <div class="topic-main">
                <span class="topic-category">${t.categorie}</span>
                <h3>${t.titel}</h3>
                <span class="topic-author">door ${t.auteur}</span>
            </div>
            <div class="topic-meta">
                <span class="topic-replies">${t.reacties} reacties</span>
                <span class="topic-time">${t.laatste_activiteit}</span>
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
        renderTopics();
    });

    document.querySelector('.new-topic-btn').addEventListener('click', () => {
        alert('Nieuw topic aanmaken — koppel hier je login/posting-systeem.');
    });
});
