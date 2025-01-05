import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogingComponent } from './auth/loging/loging.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [
  { path: 'login', component: LogingComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: DashboardComponent,
    children: DashboardRoutes
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
