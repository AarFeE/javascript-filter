import { navigateTo } from "../Router";
import styles from "./page-layout.styles.css"

export function PageLayoutScene(pageContent, logic) {
    const isAdmin = Boolean(JSON.parse(localStorage.getItem('user')).isAdmin);
    console.log(isAdmin);
    const root = document.getElementById('root');
    root.innerHTML = `
        <header>
            <nav class="${styles.navbar}">
                <p id="logoBtn">My Filter SPA</p>
                ${isAdmin ? `
                <p id="reservationsBtn" class="${styles.nav_btn}">Reservations</p>
                <p id="flightsBtn" class="${styles.nav_btn}">Flights</p>
                ` : ''}
                <p id="logoutBtn" class="${styles.nav_btn}">LogOut</p>
            </nav>
        </header>
        <main>
            ${pageContent}
        </main>
    `
    logic();

    const logoBtn = document.getElementById('logoBtn');
    logoBtn.addEventListener('click', (e) => {
        navigateTo('/dashboard');
    })

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigateTo('/login');
    })

    const reservationsBtn = document.getElementById('reservationsBtn');
    if (reservationsBtn) {
        reservationsBtn.addEventListener('click', (e) => {
            navigateTo('/dashboard/reservations');
        })
    }

    const flightsBtn = document.getElementById('flightsBtn');
    if (flightsBtn) {
        flightsBtn.addEventListener('click', (e) => {
            navigateTo('/dashboard/flights');
        })
    }
}