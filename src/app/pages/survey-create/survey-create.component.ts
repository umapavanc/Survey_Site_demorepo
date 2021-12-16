import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { Survey } from 'src/app/models/survey.model';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/models/response.model';
import { ResponseService } from 'src/app/services/response.service';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {

  arrayOfQuestions: Question[] = new Array();

  survey: Survey = {
    title: '',
    description: '',
    published: false,
    user: ''
  };
  // QUESTION IMPLEMENTATION
  question: Question = {
    questionText: '',
    questionType: 0,
    surveyId: ''
  }

  response: Response = {
    responseText: '',
    questionId: ''
  }
  responses: Response[];
  
  responseSubmitted = false;
  surveySubmitted = false;
  storedId: string;
  qId: string;
  questionSubmitted = false;

  questions?: Question[];
  currentQuestion?: Question;
  currentIndex = -1;

  btnDisable: boolean = true;
  btnDisable1: boolean = true;
  btnDisable2: boolean = true;
  isShownQuestions: boolean = false;
  selectedType: string = "0";
  checkArray = new Array(1);
  radioArray = new Array(2);
  questionArray = new Array();
  isShownText: boolean = false;
  isShownRadioButn: boolean = false;
  isShownCheckBox: boolean = false;
  isShownCommentBox: boolean = false;
  isShownStarRating: boolean = false;
  currentUser: any;

  constructor(private surveyService: SurveyService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private responseService: ResponseService,
    private token: TokenStorageService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  createSurvey(): void {
    const data = {
      title: this.survey.title,
      description: this.survey.description,
      user: this.currentUser.username
    };

    this.surveyService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.surveySubmitted = true;
          this.storedId = response.id;
          console.log("HERE IT IS" + this.storedId);
          console.log("user " + this.currentUser.username);
          this.isShownQuestions = true;
        },
        error => {
          console.log(error);
        });
  }


  newQuestion() {

    this.isShownText = false;
    this.isShownRadioButn = false;
    this.isShownCheckBox = false;
    this.isShownCommentBox = false;
    this.btnDisable= true;
    this.btnDisable1= true;
    this.btnDisable2=true;
  }

  saveQuestion(): void {
    if (this.arrayOfQuestions == null) {
      this.arrayOfQuestions = new Array();
      console.log("Created");
    }
    if (this.question.questionText != '' && this.question.questionType != 0) {
      const data = {
        questionText: this.question.questionText,
        questionType: this.question.questionType,
        surveyId: this.storedId
      };
      
      this.arrayOfQuestions.push(data);
      this.question.questionText = '';
      this.question.questionType = 0;
      this.newQuestion();
      console.log(data)
      console.log(this.arrayOfQuestions)
    }

    

    /**/
  }

  closeSurvey(): void {
    for (var i = 0; i < this.arrayOfQuestions.length; i++) {
      this.questionService.create(this.arrayOfQuestions[i])
        .subscribe(
          response => {
            console.log(response.id);
            this.questionSubmitted = true;
            this.router.navigate(['/surveys']);
          },
          error => {
            console.log(error);
          });
    }
  }

  onChange(value) {
    if (this.question.questionText != '' && value == "1" || value == "2") {
      this.btnDisable = false;
    }else{
      this.btnDisable = true;
    }
    if (this.question.questionText != '' && value == "3" ) {
      this.btnDisable1 = false;
    }else{
      this.btnDisable1 = true;
    }
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

  saveMCQ(): void {
    if (this.arrayOfQuestions == null) {
      this.arrayOfQuestions = new Array();
      console.log("Created");
    }
    if (this.question.questionText != '' && this.question.questionType != 0) {
      const data = {
        questionText: this.question.questionText,
        questionType: this.question.questionType,
        surveyId: this.storedId
      };

      this.questionService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.qId = response.id;
          console.log("HERE IT IS" + this.qId);
        },
        error => {
          console.log(error);
        });
      
      this.arrayOfQuestions.push(data);
      console.log(data)
      console.log(this.arrayOfQuestions)
      this.btnDisable2=false;
    }

    

    /**/
  }



  saveAnswer(): void {
    const resData = {
      responseText: this.response.responseText,
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

      this.question.questionText = '';
      this.question.questionType = 0;
      this.newQuestion();
    }


  
}
