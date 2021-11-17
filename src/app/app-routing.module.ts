import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ActiveSurveysComponent } from './pages/active-surveys/active-surveys.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'about', component: AboutComponent, data: {title: 'About'}},
  {path: 'create-survey', component: CreateSurveyComponent, data: {title: 'Create Survey'}},
  {path: 'active-surveys', component: ActiveSurveysComponent, data: {title: 'List'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login Page'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register Page'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
