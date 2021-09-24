import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { IAddress } from '../hero';
import { HeroService } from '../hero.service';
import { Dataservice } from '../Services/dataservices';
@Component({
  selector: 'app-search-function',
  templateUrl: './app-search-function.component.html',
  styleUrls: ['./app-search-function.component.scss'],
})
export class AppSearchFunctionComponent implements OnInit {
  searchTerms: any;
  constructor(
    private heroService: HeroService,
    private dataService: Dataservice
  ) {}
  search(term: string): void {
    debugger;
    this.dataService.SearchData(term);
  }
  ngOnInit(): void {}
}
