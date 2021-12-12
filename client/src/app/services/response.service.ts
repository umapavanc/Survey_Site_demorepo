import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';



const baseURL = 'http://localhost:8080/api/responses';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Response[]> {
    return this.http.get<Response[]>(baseURL);
  }

  get(id: string): Observable<Response> {
    return this.http.get(`${baseURL}/${id}`);
  }

  getResponseById(id: string): Observable<any> {
    return this.http.get<any>(`${baseURL}/res/${id}`)
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

  findByQuestion(questionId: any): Observable<Response[]> {
    return this.http.get<Response[]>(`${baseURL}/${questionId}`);
  }


  updateQuestion(id: string, newQuestion: Response): Observable<any> {
    return this.http.put(`${baseURL}/${id}`, newQuestion)
  }
}
