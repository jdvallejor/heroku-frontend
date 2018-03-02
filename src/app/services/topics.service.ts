import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Topic } from '../models/topic';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class TopicsService {
  private apiUrl = 'https://integrador2018.herokuapp.com/topics'; 

  constructor(
    private http: HttpClient
  ) { }

  getTopics(status: number): Observable<Topic[]>{
    return this.http.get<Topic[]>(`${this.apiUrl}/findByStatus?status=${status}`)
  }

  deleteTopic(topic:Topic | number): Observable<Topic>{
      const id = typeof topic === 'number' ? topic : topic.id;
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<Topic>(url,topic, httpOptions).pipe(
        tap(_ => console.log(`deleted topic id=${id}`))
      );
  }

  openTopic(topic:Topic | number): Observable<Topic>{
    const id = typeof topic === 'number' ? topic : topic.id;
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Topic>(url,topic, httpOptions).pipe(
      tap(_ => console.log(`created topic id=${id}`))
    );
  }

}