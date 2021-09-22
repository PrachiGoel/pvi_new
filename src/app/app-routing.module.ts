import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CaseManagementComponent } from './pages/case-management/case-management.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'userManagement', component:UserManagementComponent},
  {path:'questionnaire', component:QuestionnaireComponent},
  {path:'caseManagement', component:CaseManagementComponent},
  {path:"", redirectTo : "home", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
