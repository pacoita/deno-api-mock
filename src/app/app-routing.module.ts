import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'employees/new',
    component: EmployeeComponent
  },
  {
    path: 'employees/:employeeId',
    component: EmployeeComponent
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
