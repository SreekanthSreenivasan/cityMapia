import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import{ Dataservice} from '../Services/dataservices'
// import { Data } from '../data';
@Component({
  selector: 'app-back-ground',
  templateUrl: './back-ground.component.html',
  styleUrls: ['./back-ground.component.css']
})

export class BackGroundComponent implements OnInit {
  titledata: any = [];
  titledata1 :any=[];
  p: number = 1;
  heroes: Hero[] = [];
  constructor(private Dataservice:Dataservice , private heroService : HeroService) {
    this.Dataservice.SearchInput.subscribe((response) => {
      debugger
      if(response){
        debugger
        this.heroes = this.heroes.filter(data => data.name.toLowerCase().startsWith(response.toLowerCase()))
      }
      else{
        this.getAllData();
      }
    });
   }

  ngOnInit(): void {
   this.getAllData();
  }
  getAllData(){
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
}
delete(hero: Hero): void {
  debugger
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero.id).subscribe();
}
  }

