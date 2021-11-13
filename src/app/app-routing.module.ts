import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveSurveysComponent } from './pages/active-surveys/active-surveys.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'home', component: LandingPageComponent},
  {path: 'create-survey', component: CreateSurveyComponent},
  {path: 'active-surveys', component: ActiveSurveysComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
