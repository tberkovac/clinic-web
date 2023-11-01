import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsDashboardComponent } from './doctors-dashboard/doctors-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DoctorsDashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManageDoctorsRoutingModule { }
