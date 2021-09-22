import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from '../message.service';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class Dataservice {
  private heroesUrl = 'api/heroes'; // URL to web api
  public TitleData = new BehaviorSubject('');
  public SearchInput = new BehaviorSubject('');
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  public AddTitleData(value: any) {
    this.TitleData.next(value);
  }
  public SearchData(value: any) {
    debugger
    this.SearchInput.next(value);
  }
    getHeroes(): Observable<Hero[]> {
      debugger
      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
