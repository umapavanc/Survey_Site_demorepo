import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { Survey } from 'src/app/models/survey.model';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    published: false
  };
  // QUESTION IMPLEMENTATION
  question: Question = {
    questionText: '',
    questionType: 0,
    surveyId: ''
  }
  surveySubmitted = false;
  storedId: string;
  questionSubmitted = false;

  questions?: Question[];
  currentQuestion?: Question;
  currentIndex = -1;

  btnDisable: boolean = true;
  isShownQuestions: boolean = false;
  isButtonVisible: boolean = false;
  selectedType: string = "0";
  checkArray = new Array(1);
  radioArray = new Array(2);
  questionArray = new Array();
  isShownText: boolean = false;
  isShownRadioButn: boolean = false;
  isShownCheckBox: boolean = false;
  isShownCommentBox: boolean = false;
  isShownStarRating: boolean = false;

  constructor(private surveyService: SurveyService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router) { }

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
          this.isShownQuestions = true;
        },
        error => {
          console.log(error);
        });
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

  newQuestion() {
    this.isButtonVisible = false;
    //this.selectedType = "0";
   // this.question = null;
    this.isShownText = false;
    this.isShownRadioButn = false;
    this.isShownCheckBox = false;
    this.isShownCommentBox = false;
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

  enableSaveBtn(value) {
    if (value != '' && this.question.questionType != 0) {
      this.btnDisable = false;
    }
    else{
      this.btnDisable = true;
    }
  }

  onChange(value) {
    if (this.question.questionText != '' && value != "0") {
      this.btnDisable = false;
    }else{
      this.btnDisable = true;
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
    else if (value == "4") {
      this.isShownCommentBox = true;
      this.isShownRadioButn = false;
      this.isShownCheckBox = false;
      this.isShownText = false;
      this.isShownStarRating = false;
    }
    else if (value == "5") {
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
}
