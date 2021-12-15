import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question.model';



@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent implements OnInit {
  id: string = ""
  showMsg= false;
  currentSurvey: Survey = {
    id: '',
    title: '',
    description: '',
    published: false,
    user: ''
  };
  message = '';

  question: Question = {
    id: '',
    questionText: '',
    questionType: 0,
    surveyId: ''
  };
  questions: Question[];
  surveyId = '';
  questionIndex = -1;
  questionNumber: any;

 
  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ""
    this.surveyService.getSurveyById(this.id)
      .subscribe(data => this.currentSurvey = data);
    
    this.surveyId =  this.route.snapshot.paramMap.get('id') || "";

    this.questionService.findBySurvey(this.surveyId)
    .subscribe(
      questionData => {
        this.questions = questionData;
        
        console.log(questionData);
        console.log('LOG ID' + this.surveyId)
        
      },
      error => {
        console.log(error);
      });
  }

  // SURVEY EDITING FUNCTIONS 
  isShownText: boolean = false;
  isShownRadioButn: boolean = false;
  isShownCheckBox: boolean = false;
  isShownCommentBox: boolean = false;
  isShownStarRating: boolean = false;

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
          this.showMsg= true;
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
          this.showMsg= true;
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

  // QUESTION EDITING FUNCTIONS

  displayAllQuestions(question: Question, index: number): void {
    this.surveyId = question.surveyId;
    this.questionIndex = index;
  }

  deleteQuestion(id: string): void {
    this.questionService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          console.log("log" + this.question.id)
          this.message = response.message;
          this.showMsg= true;
        },
        error => {
          console.log(error);
        }
      )
      this.refresh();
  }

  updateQuestion(id: string, text: string, type: number): void {
    const data = {
      questionText: text,
      questionType: type
    };
    this.questionService.update(id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
          console.log("question ID " + id)
          console.log("text " + text)
          this.showMsg= true;
        },
        error => {
          console.log(error);
        });
        this.refresh();
  }

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
    console.log(value);
  }

  refresh(): void {
    this.ngOnInit();
    this.questionIndex = -1;
  }

}
