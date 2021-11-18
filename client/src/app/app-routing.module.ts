import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SurveyCreateComponent } from './pages/survey-create/survey-create.component';
import { SurveyListComponent } from './pages/survey-list/survey-list.component';
import { SurveyEditComponent } from './pages/survey-edit/survey-edit.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'about', component: AboutComponent, data: {title: 'About'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login Page'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'create', component: SurveyCreateComponent, data: {title: 'Create New Survey'}},
  {path: 'surveys', component: SurveyListComponent, data: {title: 'Current Surveys'}},
  {path: 'surveys/:id/edit', component: SurveyEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
