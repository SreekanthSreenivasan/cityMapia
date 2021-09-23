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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      data: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
    this.titledata = [];
  }
  ngOnInit() {
    debugger;

    this.titledata = [];
  }

  getAllData(): void {
    debugger;
    this.Dataservice.getHeroes().subscribe(
      (heroes) => (this.heroes = heroes.slice(1, 5))
    );
  }
  // add(name: string): void {
  //   debugger;
  //   name = name.trim();
  //   if (!name) {
  //     return;
  //   }
  //   this.heroService.addHero({ name } as IAddress).subscribe((data) => {
  //     this.address.push(data);
  //     // console.log(this.heroes);
  //     console.log(this.address);
  //     this.addNewData.emit();
  //   });
  // }

  onSubmit() {
    debugger;
    console.log('Selected country', this.Formdata.value.country);
    let name = this.Formdata.value.firstName;
    let LastName = this.Formdata.value.lastName;
    let address = this.Formdata.value.firstName;
    let country = this.Formdata.value.country;

    let newObj = {
      name: this.Formdata.value.firstName,
      lastName: this.Formdata.value.lastName,
      country: this.Formdata.value.country,
    };
    console.log(newObj);

    name = name.trim();
    LastName = LastName.trim();

    if (!name || !LastName || !address || !country) {
      debugger;

      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
      console.log(this.heroes);
      this.addNewData.emit();
    });
  }
}
