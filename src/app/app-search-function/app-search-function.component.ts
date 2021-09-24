import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IAddress } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-search-function',
  templateUrl: './app-search-function.component.html',
  styleUrls: ['./app-search-function.component.scss'],
})
export class AppSearchFunctionComponent implements OnInit {
  searchTerms: any;
  constructor(private heroService: HeroService) {}
  search(term: string): void {
    debugger;
    this.heroService.SearchData(term);
  }
  ngOnInit(): void {}
  selectedValue(e: any) {
    debugger;
    this.heroService.SearchCountry(e.value);
  }
}
