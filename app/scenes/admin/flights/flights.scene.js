import { navigateTo } from "../../../Router";

export function FlightsScene() {
    const pageContent = `
        <h1>Flights Page</h1>
        <a id="newFlightBtn">Add Flight</a>
    `;

    const logic = () => {
        const newFlightBtn = document.getElementById('newFlightBtn');
        newFlightBtn.addEventListener('click', (e) => {
            navigateTo('/dashboard/flights/edit-new-flight');
        })
    };

    return { pageContent, logic };
}