// dashboard.js — Dashboard met statistieken, menu en tabel
// ARC AI Agents Website Fabriek

async function loadData() {
    const res = await fetch('../data/dashboard.json');
    const data = await res.json();
    renderMenu(data.menu);
    renderStats(data.stats);
    renderTable(data.tabel);
}

function renderMenu(menu) {
    const nav = document.getElementById('sidebarMenu');
    nav.innerHTML = menu.map((item, i) => `
        <a href="#" class="menu-item ${i === 0 ? 'active' : ''}">${item}</a>
    `).join('');

    nav.querySelectorAll('.menu-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            nav.querySelectorAll('.menu-item').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function renderStats(stats) {
    const grid = document.getElementById('statGrid');
    grid.innerHTML = stats.map(s => {
        const isNegative = s.verandering.startsWith('-');
        return `
            <div class="stat-card">
                <span class="stat-label">${s.label}</span>
                <div class="stat-value">${s.waarde}</div>
                <span class="stat-change ${isNegative ? 'negative' : 'positive'}">${s.verandering}</span>
            </div>
        `;
    }).join('');
}

function renderTable(tabel) {
    const table = document.getElementById('dataTable');
    const thead = `<thead><tr>${tabel.kolommen.map(k => `<th>${k}</th>`).join('')}</tr></thead>`;
    const tbody = `<tbody>${tabel.rijen.map(rij => `
        <tr>${rij.map((cel, i) => {
            if (i === 1) {
                const statusClass = cel.toLowerCase().replace(' ', '-');
                return `<td><span class="status status-${statusClass}">${cel}</span></td>`;
            }
            return `<td>${cel}</td>`;
        }).join('')}</tr>
    `).join('')}</tbody>`;
    table.innerHTML = thead + tbody;
}

document.addEventListener('DOMContentLoaded', loadData);

// === Mobiel sidebar-toggle (toegevoegd door Forge) ===
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');

    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            sidebar.classList.toggle('open');
        });
    }
});
