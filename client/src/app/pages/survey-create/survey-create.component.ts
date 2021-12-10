import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { Survey } from 'src/app/models/survey.model';
import { Variable } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {

  isButtonVisible:boolean = false;
  question: string = "";
  selectedType: string = "0";
  checkArray = new Array(1);
  isShownText: boolean = false;
  isShownRadioButn: boolean = false;
  isShownCheckBox: boolean = false;
  isShownCommentBox: boolean = false;
  isShownStarRating: boolean = false;

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
  onChange(value) {
    if (value == "1") {
      this.isShownText = true;
      this.isShownRadioButn = false;
      this.isShownCheckBox = false;
      this.isShownCommentBox = false;
      this.isShownStarRating = true;
    }
    else if (value == "2") {
      this.isShownRadioButn = true;
      this.isShownText = false;
      this.isShownCheckBox = false;
      this.isShownCommentBox = false;
      this.isShownStarRating = false;
    }
    else if (value == "3") {
      this.isShownCheckBox = true;
      this.isShownRadioButn = false;
      this.isShownText = false;
      this.isShownCommentBox = false;
      this.isShownStarRating = false;
    }
    else if (value == "4") {
      this.isShownCommentBox = true;
      this.isShownRadioButn = false;
      this.isShownCheckBox = false;
      this.isShownText = false;
      this.isShownStarRating = false;
    }
    else if (value == "5"){
      this.isShownText = false;
      this.isShownRadioButn = false;
      this.isShownCheckBox = false;
      this.isShownCommentBox = false;
      this.isShownStarRating = false;
    }
    else {
      this.isShownText = false;
      this.isShownRadioButn = false;
      this.isShownCheckBox = false;
      this.isShownCommentBox = false;
      this.isShownStarRating = false;
    }
   
    console.log(value);
  }

  add() {
    if (this.checkArray.length < 5) {
      this.checkArray.length++;
      console.log(this.checkArray.length);
    }
  }

  remove() {
    if (this.checkArray.length > 1) {
      this.checkArray.length--;
      console.log(this.checkArray.length);
    }
  }

  saveQuestion(question) { 
    this.isButtonVisible = true;
    console.log("Hello" + question + " " + this.selectedType);
  }

  newQuestion(){
    this.isButtonVisible = false;
    this.selectedType = "0";
    this.question = null;
    this.isShownText = false;
    this.isShownRadioButn = false;
    this.isShownCheckBox = false;
    this.isShownCommentBox = false;
  }
}
