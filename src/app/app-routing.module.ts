import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SurveyCreateComponent } from './pages/survey-create/survey-create.component';
import { SurveyListComponent } from './pages/survey-list/survey-list.component';
import { SurveyEditComponent } from './pages/survey-edit/survey-edit.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TakeSurveyComponent } from './pages/take-survey/take-survey.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'about', component: AboutComponent, data: {title: 'About'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login Page'}},
  {path: 'create', component: SurveyCreateComponent, data: {title: 'Create New Survey'}},
  {path: 'surveys', component: SurveyListComponent, data: {title: 'Current Surveys'}},
  {path: 'surveys/:id/edit', component: SurveyEditComponent},
  {path: 'register', component: RegisterComponent, data: {title: 'Register Page'}},
  {path: 'profile', component: ProfileComponent, data: {title: 'Profile'} },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'questions/takeSurvey/:id', component: TakeSurveyComponent, data: {title: 'Survey Attempt'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
