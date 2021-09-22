import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { HeroService } from '../hero.service';
import { Dataservice } from '../Services/dataservices';
import { Hero } from '../Services/hero';

@Component({
  selector: 'app-add-function',
  templateUrl: './add-function.component.html',
  styleUrls: ['./add-function.component.scss'],
})
export class AddFunctionComponent {
  @Output() addNewData = new EventEmitter();
  name = 'Angular';
  data: any;
  titledata: any = [];
  Formdata: FormGroup;
  heroes: Hero[] = [];
  constructor(
    private fb: FormBuilder,
    private Dataservice: Dataservice,
    private heroService: HeroService
  ) {
    this.Formdata = this.fb.group({
      title: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
    this.titledata = [];
  }
  ngOnInit() {
    this.titledata = [];
  }

  getAllData(): void {
    debugger;
    this.Dataservice.getHeroes().subscribe(
      (heroes) => (this.heroes = heroes.slice(1, 5))
    );
  }

  add(name: string): void {
    debugger;
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
      console.log(this.heroes);
      this.addNewData.emit();
    });
  }
}
