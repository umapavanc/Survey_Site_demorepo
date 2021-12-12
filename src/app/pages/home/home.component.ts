import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  btnDisable:boolean = true;
  surveys?: Survey[];
  currentSurvey?: Survey;
  currentIndex = -1;
  title = '';
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  private roles: string[] = [];


  constructor(private surveyService: SurveyService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getSurveys();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }

  getSurveys(): void {
    this.surveyService.getAll()
      .subscribe(
        data => {
          this.surveys = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refresh(): void {
    this.getSurveys();
    this.currentSurvey = undefined;
    this.currentIndex = -1;
  }

  setCurrentSurvey(survey: Survey, index: number): void {
    this.currentSurvey = survey;
    this.currentIndex = index;
    this.btnDisable = false;
  }

  takeSurvey(){
    console.log(this.currentSurvey.title);
    this.btnDisable = true;
  }

  export(){
    html2canvas(document.querySelector("#exportData")).then(canvas => {
    
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      
      PDF.save('survey-report.pdf');
  });  
  }

  searchTitle(): void {
    this.surveyService.findByTitle(this.title)
      .subscribe(
        data => {
          this.surveys = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getSurvey(id: string): void {
    this.surveyService.get(id)
      .subscribe(
        data => {
          this.currentSurvey = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
