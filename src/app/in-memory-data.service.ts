import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IAddress } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: any = [
      { id: 11, name: 'Mr. Nice', country: 'India' },
      { id: 12, name: 'Narco', country: 'America' },
      { id: 13, name: 'Bombasto', country: 'India' },
      { id: 14, name: 'Celeritas', country: 'America' },
    ];
    return { heroes };
  }

  genId(heroes: IAddress[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
