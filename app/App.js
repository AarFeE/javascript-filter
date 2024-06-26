import { Router } from "./Router";

export function App() {
    const root = document.getElementById('root');

    if (!root) {
        throw new Error('Root Element Not Found');
    }

    Router();
}