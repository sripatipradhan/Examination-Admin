import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineExamService {

  constructor(private http:HttpClient) { }

  addQuestion(data): Observable<any> {
      return this.http.post('http://localhost:3000/onlineExam/addQuestion', data);
  }

  getQuestionPaper(SubCode): Observable<any> {
      return this.http.get('http://localhost:3000/onlineExam/getQuestionPaper/' + SubCode);
  }

  deleteQuestionPaper(data): Observable<any> {
      return this.http.post('http://localhost:3000/onlineExam/deleteQuestionPaper/' , data);
  }
  updateQuestion(questionID,data): Observable<any> {
      return this.http.put('http://localhost:3000/onlineExam/updateQuestion/'+ questionID, data);
  }
}
