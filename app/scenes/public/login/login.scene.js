import { navigateTo } from "../../../Router";

export function LoginScene() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>Login Page</h1>
        <form id="login-form">
            <input id="login-email" type="email" placeholder="johndoe@email.com" autocomplete="email"  />
            <input id="login-password" type="password" placeholder="Password" autocomplete="password"  />
            <button type="submit">Login</button>
        </form>
    `

    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const $email = document.getElementById('login-email').value;
        const $password = document.getElementById('login-password').value;

        if (!$email || !$password) {
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
        const userData = userDataArr.at(0)

        if (!userData) {
            alert("There's no user registered with the provided email.")
            return;
        }

        if (userData.password !== $password) {
            alert("Passwords don't match!");
            return;
        }

        localStorage.setItem('token', Math.random().toString(32).substring(2));
        localStorage.setItem('user', JSON.stringify(userData));
        navigateTo('/dashboard');
    })
}