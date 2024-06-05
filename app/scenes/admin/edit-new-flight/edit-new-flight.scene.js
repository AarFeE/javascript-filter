import { navigateTo } from "../../../Router";

export async function EditNewFlightScene(params) {
    const flightId = params.get('id');
    let paramsFlight;
    if(flightId) {
        paramsFlight = await fetch(`http://localhost:3000/flights?id=${flightId}`);
        paramsFlight = await paramsFlight.json();
        paramsFlight = paramsFlight.at(0);
    }
    const pageContent = `
        <h1>Edit/Add Flight</h1>
        <form id="addEditFlightForm">
            <label for="flight-number">Flight Number:</label>
            <input id="flight-number" ${paramsFlight?`value="${paramsFlight.number}"`:''} name="number" type="number" min="1" required />
            <label for="flight-origin">Origin:</label>
            <input id="flight-origin" ${paramsFlight?`value="${paramsFlight.origin}"`:''} name="origin" type="text" placeholder="JFK" required />
            <label for="flight-destination">Destination:</label>
            <input id="flight-destination" ${paramsFlight?`value="${paramsFlight.destination}"`:''} name="destination" type="text" placeholder="LAX" required />
            <label for="flight-departure">Departure:</label>
            <input id="flight-departure" ${paramsFlight?`value="${paramsFlight.departure}"`:''} name="departure" type="date" required />
            <label for="flight-arrival">Arrival:</label>
            <input id="flight-arrival" ${paramsFlight?`value="${paramsFlight.arrival}"`:''} name="arrival" type="date" required />
            <label for="flight-capacity">Capacity:</label>
            <input id="flight-capacity" ${paramsFlight?`value="${paramsFlight.capacity}"`:''} name="capacity" type="number" min="1" required />
            <button type="submit">Send Flight</button>
        </form>
    `;

    const logic = () => {
        const form = document.getElementById('addEditFlightForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const $number = document.getElementById('flight-number').value;
            const $origin = document.getElementById('flight-origin').value;
            const $destination = document.getElementById('flight-destination').value;
            const $departure = document.getElementById('flight-departure').value;
            const $arrival = document.getElementById('flight-arrival').value;
            const $capacity = document.getElementById('flight-capacity').value;

            if (!$number || !$origin || !$destination || !$departure || !$arrival || !$capacity) {
                alert('Please, fill in all the fields!');
                return;
            }

            if($departure > $arrival) {
                alert('The departure date cannot be after the arrival date!');
                return;
            }

            const flight = await fetch(`http://localhost:3000/flights?number=${$number}`);
            let flightData = await flight.json();
            flightData = flightData.at(0);

            let confirmFlight;
            if(flightData){
                confirmFlight = confirm(`Are you sure you want to update the flight ${$number}?`);
            } else {
                confirmFlight = confirm(`Flight ${$number} doesn't exist. Do you want to add it?`);
            }

            if(!confirmFlight) {
                return;
            }

            const newFlight = await fetch(`http://localhost:3000/flights${flightData? `/${flightData.id}` : ''}`, {
                method: flightData? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: $number,
                    origin: $origin,
                    destination: $destination,
                    departure: $departure,
                    arrival: $arrival,
                    capacity: $capacity
                })
            });

            if(newFlight.ok) {
                if(flightData) {
                    alert('Flight updated!');
                } else {
                    alert('Flight added!');
                }
                navigateTo('/dashboard/flights');
            } else {
                alert('Something went wrong!');
            }
        })
    };

    return { pageContent, logic };
}