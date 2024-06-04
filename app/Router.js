import { PageLayoutScene } from "./components/page-layout.scene";
import { routes } from "./routes";
import { NotFoundScene } from "./scenes/not-found/not-found.scene";

export function Router() {
    const path = window.location.pathname;
    const publicRoute = routes.public.find((route) => route.path === path);
    const privateRoute = routes.private.find((route) => route.path === path);
    const adminRoute = routes.admin.find((route) => route.path === path);

    if (publicRoute) {
        if (localStorage.getItem('token')) {
            navigateTo('/dashboard');
            return;
        }
        publicRoute.scene();
        return;
    } else if (privateRoute) {
        if (!localStorage.getItem('token')) {
            navigateTo('/login');
            return;
        }
        let { pageContent, logic } = privateRoute.scene();
        PageLayoutScene(pageContent, logic);
        return;
    } else if (adminRoute) {
        if (localStorage.getItem('user') === null || JSON.parse(localStorage.getItem('user')).isAdmin !== 1) {
            console.log(JSON.parse(localStorage.getItem('user')).isAdmin);
            navigateTo('/');
            return;
        }
        let { pageContent, logic } = adminRoute.scene();
        PageLayoutScene(pageContent, logic);
        return;
    }

    if (path === '/') {
        if (localStorage.getItem('token')) {
            navigateTo('/dashboard');
            return;
        } else {
            navigateTo('/login');
            return;
        }
    }

    window.history.pushState({}, '', window.location.origin + '/not-found');
    NotFoundScene();
}

export function navigateTo(path) {
    window.history.pushState({}, '', window.location.origin + path);
    Router();
}