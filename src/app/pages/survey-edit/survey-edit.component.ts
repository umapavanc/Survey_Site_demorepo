import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';


@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent implements OnInit {
  id: string = ""
  currentSurvey: Survey = {
    id: '',
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ""
    this.surveyService.getSurveyById(this.id)
      .subscribe(data => this.currentSurvey = data)
  }

  editSurvey(): void {
    this.surveyService.updateSurvey(this.id, this.currentSurvey)
      .subscribe(() => this.router.navigateByUrl("/surveys"))
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentSurvey.title,
      description: this.currentSurvey.description,
      published: status
    };

    this.surveyService.update(this.currentSurvey.id, data)
      .subscribe(
        response => {
          this.currentSurvey.published = status;
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  updateSurvey(): void {
    this.surveyService.update(this.currentSurvey.id, this.currentSurvey)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });
  }

  deleteSurvey(): void {
    this.surveyService.delete(this.currentSurvey.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/surveys']);
        },
        error => {
          console.log(error);
        });
  }

}
