import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  getWordBank(): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get('assets/sgb-words.txt', {headers: header, responseType: 'text'});
  }
}