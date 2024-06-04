export function EditNewFlightScene() {
    const pageContent = `
        <h1>Add/Edit Flight</h1>
        <form id="addEditFlightForm">
            <input id="flight-number" name="number" type="number" min="1" required />
            <input id="flight-origin" name="origin" type="text" placeholder="JFK" required />
            <input id="flight-destination" name="destination" type="text" placeholder="LAX" required />
            <input id="flight-departure" name="departure" type="date" required />
            <input id="flight-arrival" name="arrival" type="date" required />
            <input id="flight-capacity" name="capacity" type="number" min="1" required />
            <button type="submit">Send Flight</button>
        </form>
    `;

    const logic = () => {
        const form = document.getElementById('addEditFlightForm');
        form.addEventListener('submit', async (e) => {
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

            
        })
    };

    return { pageContent, logic };
}