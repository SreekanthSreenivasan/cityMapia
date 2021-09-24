import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { IAddress } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-back-ground',
  templateUrl: './back-ground.component.html',
  styleUrls: ['./back-ground.component.scss'],
})
export class BackGroundComponent implements OnInit {
  heroes: IAddress[] = [];
  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.heroService.SearchInput.subscribe((response) => {
      debugger;
      if (response) {
        debugger;
        this.heroes = this.heroes.filter((data) =>
          data.name.toLowerCase().startsWith(response.toLowerCase())
        );
      } else {
        this.getAllData();
      }
    });
    this.heroService.searchByCountry.subscribe((response) => {
      debugger;
      if (response) {
        debugger;
        this.heroes = this.heroes.filter((data) =>
          data.country.toLowerCase().startsWith(response.toLowerCase())
        );
      } else {
        this.getAllData();
      }
    });
  }
  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    debugger;
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  delete(hero: IAddress): void {
    debugger;

    let dialogRef = this.dialog.open(DialogBoxComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.heroes = this.heroes.filter((h) => h !== hero);
        this.heroService.deleteHero(hero.id).subscribe();
        this._snackBar.open('Deleted Successfully', '', {
          duration: 1000,
        });
      } else {
        return;
      }
    });
  }
}
