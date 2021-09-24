import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IAddress } from './hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesUrl = 'api/heroes';
  public SearchInput = new BehaviorSubject('');
  public searchByCountry = new BehaviorSubject('');
  public SearchData(value: any) {
    debugger;
    this.SearchInput.next(value);
  }

  public SearchCountry(value: any) {
    debugger;
    this.searchByCountry.next(value);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<IAddress[]> {
    debugger;
    return this.http.get<IAddress[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<IAddress[]>('getHeroes', []))
    );
  }

  addHero(hero: IAddress): Observable<IAddress> {
    debugger;
    return this.http
      .post<IAddress>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: IAddress) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<IAddress>('addHero'))
      );
  }
  deleteHero(id: number): Observable<IAddress> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<IAddress>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IAddress>('deleteHero'))
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
