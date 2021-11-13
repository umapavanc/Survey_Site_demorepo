import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveSurveysComponent } from './pages/active-surveys/active-surveys.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'home', component: LandingPageComponent, data: {title: 'Home Page'}},
  {path: 'create-survey', component: CreateSurveyComponent, data: {title: 'Create Survey'}},
  {path: 'active-surveys', component: ActiveSurveysComponent, data: {title: 'Active Surveys'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login Page'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
