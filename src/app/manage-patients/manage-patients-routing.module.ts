import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsDashboardComponent } from './patients-dashboard/patients-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: PatientsDashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagePatientsRoutingModule { }
