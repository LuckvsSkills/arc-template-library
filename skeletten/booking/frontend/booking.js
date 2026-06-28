// booking.js — Afspraken/Booking systeem
// ARC AI Agents Website Fabriek

let services = [];
let openingstijden = {};
let selectedService = null;
let selectedDate = null;
let selectedTime = null;

async function loadData() {
    const res = await fetch('../data/services.json');
    const data = await res.json();
    services = data.diensten;
    openingstijden = data.openingstijden;
    renderServices();
    setupDatePicker();
}

function renderServices() {
    const list = document.getElementById('serviceList');
    list.innerHTML = services.map(s => `
        <div class="service-card" data-id="${s.id}">
            <h3>${s.naam}</h3>
            <p>${s.beschrijving}</p>
            <span class="service-price">€${s.prijs.toFixed(2).replace('.', ',')}</span>
        </div>
    `).join('');

    list.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            list.querySelectorAll('.service-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedService = services.find(s => s.id === card.dataset.id);
            renderTimeSlots();
        });
    });
}

function setupDatePicker() {
    const picker = document.getElementById('datePicker');
    const today = new Date();
    picker.min = toInputDate(today);

    picker.addEventListener('change', () => {
        const date = new Date(picker.value);
        const weekday = date.getDay();

        if (openingstijden.gesloten_weekdagen.includes(weekday)) {
            alert('Op deze dag zijn we gesloten. Kies een andere datum.');
            picker.value = '';
            selectedDate = null;
            renderTimeSlots();
            return;
        }

        selectedDate = picker.value;
        renderTimeSlots();
    });
}

function generateTimeSlots() {
    const slots = [];
    const [startH, startM] = openingstijden.start.split(':').map(Number);
    const [endH, endM] = openingstijden.eind.split(':').map(Number);
    const interval = openingstijden.interval_minuten;

    let current = startH * 60 + startM;
    const end = endH * 60 + endM;

    while (current < end) {
        const h = Math.floor(current / 60).toString().padStart(2, '0');
        const m = (current % 60).toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
        current += interval;
    }
    return slots;
}

function renderTimeSlots() {
    const container = document.getElementById('timeSlots');

    if (!selectedService || !selectedDate) {
        container.innerHTML = '<p class="hint">Selecteer eerst een dienst en datum.</p>';
        return;
    }

    const slots = generateTimeSlots();
    container.innerHTML = slots.map(slot => `
        <button type="button" class="time-slot" data-time="${slot}">${slot}</button>
    `).join('');

    container.querySelectorAll('.time-slot').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedTime = btn.dataset.time;
        });
    });
}

function toInputDate(date) {
    return date.toISOString().split('T')[0];
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();

    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();

        if (!selectedService) {
            alert('Kies eerst een dienst.');
            return;
        }
        if (!selectedDate) {
            alert('Kies eerst een datum.');
            return;
        }
        if (!selectedTime) {
            alert('Kies eerst een tijdslot.');
            return;
        }

        const summary = document.getElementById('bookingSummary');
        summary.style.display = 'block';
        summary.innerHTML = `
            <h3>Afspraak bevestigd</h3>
            <p><strong>Dienst:</strong> ${selectedService.naam} (€${selectedService.prijs.toFixed(2).replace('.', ',')})</p>
            <p><strong>Datum:</strong> ${formatDate(selectedDate)}</p>
            <p><strong>Tijd:</strong> ${selectedTime}</p>
            <p class="note">Je ontvangt een bevestiging per e-mail. (Demo — koppel hier een agenda-systeem)</p>
        `;
        summary.scrollIntoView({ behavior: 'smooth' });
    });
});
