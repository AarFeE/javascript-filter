import { navigateTo } from "../../../Router";
import styles from "./flights.styles.css";

export function FlightsScene() {
    const isAdmin = Boolean(JSON.parse(localStorage.getItem('user')).isAdmin);
    const pageContent = `
        <h1>Flights Page</h1>
        ${isAdmin ? `
        <a id="newFlightBtn" class="${styles.newFlightBtn}">Add Flight</a>
        ` : ''}
        <div id="flightsContainer"></div>
    `;

    const logic = async () => {
        const newFlightBtn = document.getElementById('newFlightBtn');
        if(newFlightBtn) {
            newFlightBtn.addEventListener('click', (e) => {
                navigateTo('/dashboard/flights/edit-new-flight');
            })
        }

        const flightsContainer = document.getElementById('flightsContainer');
        const flights = await fetch('http://localhost:3000/flights');
        const flightsData = await flights.json();
        
        flightsData.forEach((flight) => {
            const flightElement = document.createElement('div');
            flightElement.innerHTML = `
                    <p>Flight: ${flight.number}</p>
                    <p>Origin: ${flight.origin}</p>
                    <p>Destination: ${flight.destination}</p>
                    <p>Departure: ${flight.departure}</p>
                    <p>Arrival: ${flight.arrival}</p>
                    <p>Capacity: ${flight.capacity}</p>
                    ${isAdmin ? `
                    <a id="updateFlightBtn${flight.id}">Update Flight</a>
                    <a id="deleteFlightBtn${flight.id}">Delete Flight</a>
                    ` : `
                    <a id="makeReservationBtn${flight.id}">Make Reservation</a>
                    `}
            `;
            flightsContainer.appendChild(flightElement);

            let updateBtn = document.getElementById(`updateFlightBtn${flight.id}`);
            if(updateBtn) {
                updateBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateTo(`/dashboard/flights/edit-new-flight?id=${flight.id}`);
                })
            }

            let deleteBtn = document.getElementById(`deleteFlightBtn${flight.id}`);
            if(deleteBtn) {
                deleteBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const confirmDelete = confirm(`Are you sure you want to remove the flight ${flight.number}`)
    
                    if(!confirmDelete) {
                        return;
                    }
    
                    await fetch(`http://localhost:3000/flights/${flight.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    });
    
                    alert('Flight succesfully deleted!');
                    window.location.reload();
                }) 
            }

            let makeReservationBtn = document.getElementById(`makeReservationBtn${flight.id}`);
            if(makeReservationBtn) {
                makeReservationBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const confirmReservation = confirm('Are you sure you want to make this reservation?');
                    if(!confirmReservation) {
                        return;
                    }

                    let madeReservations = await fetch(`http://localhost:3000/reservations?flightId=${flight.id}`);

                    madeReservations = await madeReservations.json();

                    if(madeReservations.length >= flight.capacity) {
                        alert('Flight is full!');
                        return;
                    }

                    await fetch('http://localhost:3000/reservations', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            flightId: flight.id,
                            userId: JSON.parse(localStorage.getItem('user')).id,
                            creationDate: new Date()
                        })
                    });

                    alert('Flight succesfully reserved!');
                })
            }
        })
    };

    return { pageContent, logic };
}