import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { doctorGuard } from './guards/doctor.guard';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }, 
    {
        path: 'doctor-dashboard',
        loadChildren: () => import('../doctor-appointments/doctor-dashboard.module').then(m => m.DoctorDashboardModule),
        canActivate: [doctorGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
