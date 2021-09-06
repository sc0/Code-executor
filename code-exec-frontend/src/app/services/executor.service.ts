import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Command } from '../domain/Command';

@Injectable({
  providedIn: 'root'
})
export class ExecutorService {
  executeUrl = 'http://localhost:3000/api/execute';
  commandStatusUrl = 'http://localhost:3000/api/command/';
  historyUrl = 'http://localhost:3000/api/history';

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    return Observable.throw(error.message);
  }

  sendCommandForExecution(command: string): Observable<Command> {
    return this.http.post<Command>(this.executeUrl, new Command(command), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getCommand(id: string): Observable<Command> {
    return this.http.get<Command>(this.commandStatusUrl + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getLastTenCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(this.historyUrl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
