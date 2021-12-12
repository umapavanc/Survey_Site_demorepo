import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey} from '../models/survey.model';


const baseURL = 'https://survey-server-group.herokuapp.com/api/surveys'; //'http://localhost:8080/api/surveys';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Survey[]> {
    return this.http.get<Survey[]>(baseURL);
  }

  get(id: string): Observable<Survey> {
    return this.http.get(`${baseURL}/${id}`);
  }

  getSurveyById(id: string): Observable<any> {
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

  findByTitle(title: any): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${baseURL}?title=${title}`);
  }


  updateSurvey(id: string, newSurvey: Survey): Observable<any> {
    return this.http.put(`${baseURL}/${id}`, newSurvey)
  }
}
