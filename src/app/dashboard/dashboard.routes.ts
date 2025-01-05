import { Routes } from "@angular/router";
import { IngresoEgresoComponent } from "../ingreso-egreso/ingreso-egreso.component";
import { StadisticComponent } from "../ingreso-egreso/stadistic/stadistic.component";
import { DetailComponent } from "../ingreso-egreso/detail/detail.component";

export const DashboardRoutes: Routes = [
    { path: '', component: StadisticComponent },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent },
    { path: 'detalle', component: DetailComponent }
]