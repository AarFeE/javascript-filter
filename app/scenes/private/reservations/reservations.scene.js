export function ReservationsScene() {
    const pageContent = `
        <h1>Reservations Page</h1>
        <div id="reservationsContainer"></div>
    `
    const logic = async () => {
        const isAdmin = Boolean(JSON.parse(localStorage.getItem('user')).isAdmin);
        const reservationsContainer = document.getElementById('reservationsContainer');
        let reservations;
        if (isAdmin) {
            reservations = await fetch('http://localhost:3000/reservations')
            reservations = await reservations.json();
        } else {
            reservations = await fetch(`http://localhost:3000/reservations?userId=${JSON.parse(localStorage.getItem('user')).id}`)
            reservations = await reservations.json();
        }

        reservations.forEach(async (reservation) => {
            const flight = await fetch(`http://localhost:3000/flights/${reservation.flightId}`)
            const user = await fetch(`http://localhost:3000/users/${reservation.userId}`)
            const userData = await user.json();
            const flightData = await flight.json();
            const reservationElement = document.createElement('div');
            reservationElement.innerHTML = `
                <p>User: ${userData.username}</p>
                <p>Email: ${userData.email}</p>
                <p>Flight: ${flightData.number}</p>
                <p>Origin: ${flightData.origin}</p>
                <p>Destination: ${flightData.destination}</p>
                <p>Departure: ${flightData.departure}</p>
                <p>Arrival: ${flightData.arrival}</p>
                <p>Capacity: ${flightData.capacity}</p>
                ${isAdmin ? `<a id="${reservation.id}" class="deleteReservationBtn">Delete Reservation</a>` : ''}
            `;

            reservationsContainer.appendChild(reservationElement);

            const deleteReservationBtn = document.getElementById(`${reservation.id}`);
            if (deleteReservationBtn) {
                deleteReservationBtn.addEventListener('click', async (e) => {
                    const confirmDelete = confirm('Are you sure you want to delete this reservation?');
                    if (!confirmDelete) {
                        return;
                    }

                    await fetch(`http://localhost:3000/reservations/${e.target.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    
                    alert('Reservation deleted successfully!');
                    window.location.reload();
                })
            }
        })
    }

    return { pageContent, logic }
}