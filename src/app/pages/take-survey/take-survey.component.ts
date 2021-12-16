import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/models/survey.model';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.css']
})
export class TakeSurveyComponent implements OnInit {

  currentSurvey: Survey = {
    id: '',
    title: '',
    description: '',
    published: false,
    user: ''
  };

  question: Question = {
    id: '',
    questionText: '',
    questionType: 0,
    surveyId: ''
  };
  
  questions: Question[];
  id: string = ""
  surveyId = '';
  questionIndex = -1;
  questionNumber: any;


  constructor(private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService) { }

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

  
}
