import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IAddress } from './hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesUrl = 'api/heroes';

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

  getHeroNo404<Data>(id: number): Observable<IAddress> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<IAddress[]>(url).pipe(
      map((heroes) => heroes[0]),
      tap((h) => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<IAddress>(`getHero id=${id}`))
    );
  }
  getHero(id: number): Observable<IAddress> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IAddress>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<IAddress>(`getHero id=${id}`))
    );
  }
  searchHeroes(term: string): Observable<IAddress[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<IAddress[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<IAddress[]>('searchHeroes', []))
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
