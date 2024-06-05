import { RegisterScene } from "./scenes/public/register/register.scene";
import { LoginScene } from "./scenes/public/login/login.scene";
import { DashboardScene } from "./scenes/private/dashboard/dashboard.scene";
import { ReservationsScene } from "./scenes/private/reservations/reservations.scene";
import { FlightsScene } from "./scenes/private/flights/flights.scene";
import { EditNewFlightScene } from "./scenes/admin/edit-new-flight/edit-new-flight.scene";


export const routes = {
    public: [
        { path: '/register', scene: RegisterScene },
        { path: '/login', scene: LoginScene }
    ],
    private: [
        { path: '/dashboard', scene: DashboardScene },
        { path: '/dashboard/reservations', scene: ReservationsScene },
        { path: '/dashboard/flights', scene: FlightsScene }
    ],
    admin: [
        { path: '/dashboard/flights/edit-new-flight', scene: EditNewFlightScene }
    ]
}