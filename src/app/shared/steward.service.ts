import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ResponseWrapper} from './response-wrapper';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StewardService<T, E> {

  private headers: HttpHeaders;
  public api = 'https://shipmonk-backend.herokuapp.com/api/v1/';

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
  }

  get(endpoint: string): Observable<ResponseWrapper<E>> {
    return this.http.get(this.api + endpoint).pipe(
      catchError(this.handleError<any>())
    );
  }

  post(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.post(this.api + endpoint, JSON.stringify(data), {headers: this.headers}).pipe(
      catchError(this.handleError<any>())
    );
  }

  // tslint:disable-next-line:no-shadowed-variable
  private handleError<ResponseWrapper>(): any {
    return (error: HttpErrorResponse): Observable<any> => {
      const res = new ResponseWrapper();
      if (error.status === 500) {
        res.code = error.status;
        res.message = 'Sorry internal server error occured please try again later';
      } else {
        res.code = error.status;
        res.message = error.error.message;
        res.data = error.error.data;
      }
      return of(res);
    };
  }
}
