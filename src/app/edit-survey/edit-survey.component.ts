import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Survey } from '../model/survey.model';
import { SurveyRepository } from '../model/survey.repository';


@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {

  constructor(private repository: SurveyRepository) { }

  ngOnInit(): void {
  }

  get surveys(): Survey[] {
    return this.repository.getSurveys();
  }

  get authors(): string[] {
    return this.repository.getAuthors();
  }

  get survey(): Survey[] {

    return this.repository.getSurveys();
  }

}
