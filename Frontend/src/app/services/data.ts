import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private reqresApiUrl = 'https://reqres.in/api/';
  private jsonServerApiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getReqresUsers(): Observable<any> {
    return this.http.get(`${this.reqresApiUrl}users?page=1`);
  }

  getJsonServerPosts(): Observable<any> {
    return this.http.get(`${this.jsonServerApiUrl}posts`);
  }
}
