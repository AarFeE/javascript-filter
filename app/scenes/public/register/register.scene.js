import { navigateTo } from "../../../Router";

export function RegisterScene() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>Register Page</h1>
        <form id="register-form">
            <input id="register-username" type="text" placeholder="JohnDoe" autocomplete="username"  />
            <input id="register-birthDate" type="date"  />
            <input id="register-email" type="email" placeholder="johndoe@email.com" autocomplete="email"  />
            <input id="register-password" type="password" placeholder="Password" autocomplete="password"  />
            <button type="submit">Register</button>
        </form>
    `

    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const $username = document.getElementById('register-username').value;
        const $birthDate = document.getElementById('register-birthDate').value;
        const $email = document.getElementById('register-email').value;
        const $password = document.getElementById('register-password').value;

        if (!$username || !$birthDate || !$email || !$password) {
            alert('Please, fill in all the fields!');
            return;
        }

        const user = await fetch(`http://localhost:3000/users?email=${$email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const userDataArr = await user.json();
        const userData = userDataArr.at(0);

        if (userData) {
            alert('A registered user already exists with that email, please try with a new one.');
            return;
        }

        const newUser = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: $username,
                birth_date: $birthDate,
                email: $email,
                password: $password,
                isAdmin: 0
            })
        })

        const newUserData = await newUser.json();

        if (!newUserData) {
            alert('An error ocurred during the user creation!');
            return;
        };

        alert('User succesfully created!');
        navigateTo('/login')
    })
}