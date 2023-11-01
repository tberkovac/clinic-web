import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionDashboardComponent } from './admission-dashboard/admission-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: AdmissionDashboardComponent
    },
    {
        path: 'manage-doctors',
        loadChildren: () => import('../manage-doctors/manage-doctors.module').then(m => m.ManageDoctorsModule)
    },
    {
        path: 'manage-patients',
        loadChildren: () => import('../manage-patients/manage-patients.module').then(m => m.ManagePatientsModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddmissionRoutingModule { }
