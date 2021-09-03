import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'questionnaire', component:QuestionnaireComponent},
  {path:"", redirectTo : "home", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
