import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { Survey } from 'src/app/models/survey.model';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/models/response.model';
import { ResponseService } from 'src/app/services/response.service';
import { NgForm } from '@angular/forms';

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

  surveySubmitted = false;
  storedId : string;
  qId: string;
  
 

  constructor(private surveyService: SurveyService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private responseService: ResponseService) { }

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
          this.surveySubmitted = true;
          this.storedId = response.id;
          console.log("HERE IT IS" + this.storedId);
        },
        error => {
          console.log(error);
        });
  }

 // QUESTION + RESPONSE IMPLEMENTATION
 question: Question ={
  questionText: '',
  questionType: 0,
  surveyId: ''
}

responses: Response = {
  responseText: '',
  questionId: ''
}

questionSubmitted = false;
responseSubmitted = false;

questions?: Question[];
currentQuestion?: Question;
currentIndex = -1;

isButtonVisible:boolean = false;
selectedType: string = "0";
checkArray = new Array(1);
radioArray = new Array(1);
questionArray = new Array();
isShownText: boolean = false;
isShownRadioButn: boolean = false;
isShownCheckBox: boolean = false;
isShownCommentBox: boolean = false;
isShownStarRating: boolean = false;

onChange(value) {
  if (value == "1") {
    this.isShownText = true;
    this.isShownRadioButn = false;
    this.isShownCheckBox = false;
    this.isShownCommentBox = false;
    this.isShownStarRating = false;
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
    this.isShownStarRating = true;
  }

 
  console.log(value);
}

addCheck() {
  if (this.checkArray.length < 5) {
    this.checkArray.length++;
    console.log(this.checkArray.length);
  }
}

removeCheck() {
  if (this.checkArray.length > 1) {
    this.checkArray.length--;
    console.log(this.checkArray.length);
  }
}

addRadio() {
  if (this.radioArray.length < 5) {
    this.radioArray.length++;
    console.log(this.radioArray.length);
  }
}

removeRadio() {
  if (this.radioArray.length > 1) {
    this.radioArray.length--;
    console.log(this.radioArray.length);
  }
}

addQuestion() {
  if (this.questionArray.length < 10) {
    this.questionArray.length++;
    console.log(this.questionArray.length);
  }
}

removeQuestion() {
  if (this.questionArray.length > 1) {
    this.questionArray.length--;
    console.log(this.questionArray.length);
  }
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

saveQuestion(): void {
  
  const questionData = {
    questionText: this.question.questionText,
    questionType: this.question.questionType,
    surveyId: this.storedId
  };

  this.questionService.create(questionData)
    .subscribe(
      response => {
        console.log(response);
        this.questionSubmitted = true;
        this.qId = response.id;
        console.log(this.qId);
      },
      error => {
        console.log(error);
      });
}

saveAnswer(): void {
    const resData = {
      responseText: this.responses.responseText,
      questionId: this.qId,
    }
    
      this.responseService.create(resData)
    .subscribe(
      response => {
        console.log(response);
        this.responseSubmitted = true;
        
      },
      error => {
        console.log(error);
      });
    }

closeSurvey(): void  {
  this.router.navigate(['/home']);
}

}
