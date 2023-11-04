import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsDashboardComponent } from './doctors-dashboard/doctors-dashboard.component';
import { adminGuard } from '../auth/guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        component: DoctorsDashboardComponent,
        canActivate: [adminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageDoctorsRoutingModule { }
