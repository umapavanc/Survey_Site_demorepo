import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { LoginComponent } from './pages/login/login.component';
import { ActiveSurveysComponent } from './pages/active-surveys/active-surveys.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    CreateSurveyComponent,
    LoginComponent,
    ActiveSurveysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
