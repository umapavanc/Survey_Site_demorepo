import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { BasePageComponent } from './partials/base-page/base-page.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AgGridModule } from 'ag-grid-angular';
import { SurveyCreateComponent } from './pages/survey-create/survey-create.component';
import { SurveyListComponent } from './pages/survey-list/survey-list.component';
import { SurveyEditComponent } from './pages/survey-edit/survey-edit.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

import {authInterceptorProviders} from './helpers/auth.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { QuestionCreateComponent } from './pages/question-create/question-create.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    BasePageComponent,
    HomeComponent,
    AboutComponent,
    SurveyCreateComponent,
    SurveyListComponent,
    SurveyEditComponent,
    RegisterComponent,
    ProfileComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([
      AboutComponent
    ]),
    BrowserAnimationsModule,
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
