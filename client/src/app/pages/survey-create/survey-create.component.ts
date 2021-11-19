import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { Survey } from 'src/app/models/survey.model';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {

  survey: Survey = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
  }

  createSurvey(): void {
    const data = {
      title: this.survey.title,
      description: this.survey.description
    };

    this.surveyService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
}
