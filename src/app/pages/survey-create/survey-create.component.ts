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
  questionId: string;
  responseSubmitted = false;
  surveySubmitted = false;
  storedId: string;
  questionSubmitted = false;

  questions?: Question[];
  currentQuestion?: Question;
  currentIndex = -1;

  btnDisable: boolean = true;
  btnDisable1: boolean = true;
  btnDisable2: boolean = true;
  isShownQuestions: boolean = false;
  selectedType: string = "0";
  checkArray = new Array(2);
  questionArray = new Array();
  isShownText: boolean = false;
  isShownCheckBox: boolean = false;
  isShownCommentBox: boolean = false;
  currentUser: any;
  optionText: any[] = new Array();
  toConcatResponse: String = '';
  responseArray: any[] = new Array();

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
          this.surveySubmitted = true;
          this.storedId = response.id;
          this.isShownQuestions = true;
        },
        error => {
          console.log(error);
        });
  }

  newQuestion() {

    this.isShownText = false;
    this.isShownCheckBox = false;
    this.isShownCommentBox = false;
    this.btnDisable = true;
    this.btnDisable1 = true;
    this.btnDisable2 = true;
  }

  saveQuestion(): void {
    if (this.arrayOfQuestions == null) {
      this.arrayOfQuestions = new Array(2);
      console.log("Created");
    }
    if (this.question.questionText != '' && this.question.questionType != 0) {
      const data = {
        questionText: this.question.questionText,
        questionType: this.question.questionType,
        surveyId: this.storedId
      };
      this.submitQuestion(data);
      if (this.question.questionType == 2 || this.question.questionType == 3) {
        this.saveResponse(this.questionId);
      }
      //this.router.navigate(['/surveys']);
      //this.arrayOfQuestions.push(data);
      this.question.questionText = '';
      this.question.questionType = 0;
      this.btnDisable = true;
      this.optionText = [];
      this.toConcatResponse = '';
      this.newQuestion();
    }
  }

  onCheckSubmit(): String {
    for (var i = 0; i < this.optionText.length; i++) {
      this.toConcatResponse = this.toConcatResponse + this.optionText[i] + ";";
    }
    this.responseArray.push(this.toConcatResponse);
    return this.toConcatResponse;
  }

  submitQuestion(data): void {
    this.questionService.create(data)
      .subscribe(
        response => {
          this.questionId = response.id;
          this.questionSubmitted = true;
        },
        error => {
          console.log(error);
        });
  }

  onChange(value) {
    var count = 0;
    if (this.question.questionText != '' && value != "0") {
      this.btnDisable = false;
    }
    else {
      this.btnDisable = true;
    }
    if (value == "1") {
      this.isShownText = true;
      this.isShownCheckBox = false;
      this.isShownCommentBox = false;
    }
    else if (value == "2" || value == "3") {
      this.isShownText = false;
      this.isShownCheckBox = true;
      this.isShownCommentBox = false;
    }
    else if (value == "4") {
      this.isShownCheckBox = false;
      this.isShownText = false;
      this.isShownCommentBox = true;
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

  // saveMCQ(): void {
  //   if (this.arrayOfQuestions == null) {
  //     this.arrayOfQuestions = new Array();
  //     console.log("Created");
  //   }
  //   if (this.question.questionText != '' && this.question.questionType != 0) {
  //     const data = {
  //       questionText: this.question.questionText,
  //       questionType: this.question.questionType,
  //       surveyId: this.storedId
  //     };

  //     this.questionService.create(data)
  //       .subscribe(
  //         response => {
  //           console.log(response);
  //           this.qId = response.id;
  //           console.log("HERE IT IS" + this.qId);
  //         },
  //         error => {
  //           console.log(error);
  //         });

  //     this.arrayOfQuestions.push(data);
  //     console.log(data)
  //     console.log(this.arrayOfQuestions)
  //     this.btnDisable2 = false;
  //   }
  // }

  saveResponse(questionId): void {

    const resData = {
      responseText: this.onCheckSubmit(),
      questionId: questionId,
    }

    this.responseService.create(resData)
      .subscribe(
        response => {
          this.responseSubmitted = true;

        },
        error => {
          console.log(error);
        });

  }
}
