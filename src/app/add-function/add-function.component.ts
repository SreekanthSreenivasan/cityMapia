import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  formModel!: FormGroup;
  address: Hero[] = [];
  constructor(
    private fb: FormBuilder,
    private Dataservice: Dataservice,
    private heroService: HeroService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formModel = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3)],
        Validators.maxLength(50),
      ],
      lastName: ['', [Validators.required]],
      data: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.formModel.get('email')?.valueChanges.subscribe((checkValue) => {
      console.log('value', checkValue);

      if (this.formModel.get('email')?.valid) {
        this.formModel.get('name')?.clearValidators();
        this.formModel.get('name')?.updateValueAndValidity();
      } else {
        debugger;
        this.formModel
          .get('name')
          ?.setValidators([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ]);
        this.formModel.get('name')?.updateValueAndValidity();
      }
    });
  }

  getAllData(): void {
    debugger;
    this.Dataservice.getHeroes().subscribe(
      (heroes) => (this.address = heroes.slice(1, 5))
    );
  }

  onSubmit() {
    debugger;
    if (this.formModel.invalid) {
      alert('Enter Valid Data');

      return;
    }
    this.heroService.addHero(this.formModel.value).subscribe((data) => {
      this._snackBar.open('New Data Added', '', {
        duration: 3000,
      });
      this.address.push(data);

      console.log(this.address);
      this.addNewData.emit();
    });
  }
}
