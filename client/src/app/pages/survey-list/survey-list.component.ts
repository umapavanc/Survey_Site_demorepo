import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  surveys?: Survey[];
  currentSurvey?: Survey;
  currentIndex = -1;
  title = '';

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.getSurveys();
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
