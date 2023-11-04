import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { doctorGuard } from '../auth/guards/doctor.guard';

const routes: Routes = [
    {
        path: '',
        component: DoctorDashboardComponent,
        canActivate: [doctorGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorDashboardRoutingModule { }
