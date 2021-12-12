import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model'
import { Survey } from '../models/survey.model';


const baseURL = 'http://localhost:8080/api/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Question[]> {
    return this.http.get<Question[]>(baseURL);
  }

  get(id: string): Observable<Question> {
    return this.http.get(`${baseURL}/${id}`);
  }

  getQuestionById(id: string): Observable<any> {
    return this.http.get<any>(`${baseURL}/${id}`)
  }

  create(data: any): Observable<any> {
    return this.http.post(baseURL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseURL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseURL}/${id}`);
  }

  findBySurvey(surveyId: any): Observable<Question[]> {
    return this.http.get<Question[]>(`${baseURL}/takeSurvey/${surveyId}`);
  }


  updateQuestion(id: string, newQuestion: Question): Observable<any> {
    return this.http.put(`${baseURL}/${id}`, newQuestion)
  }
}
