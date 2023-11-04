import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsDashboardComponent } from './patients-dashboard/patients-dashboard.component';
import { adminGuard } from '../auth/guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        component: PatientsDashboardComponent,
        canActivate: [adminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagePatientsRoutingModule { }
