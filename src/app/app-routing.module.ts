import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './auth/guards/admin.guard';
import { doctorGuard } from './auth/guards/doctor.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admission-dashboard',
    loadChildren: () => import('./admission/admission.module').then(m => m.AdmissionModule),
    canActivate: [adminGuard]
  },
  {
    path: 'doctor-dashboard',
    loadChildren: () => import('./doctor-appointments/doctor-dashboard.module').then(m => m.DoctorDashboardModule),
    canActivate: [doctorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
