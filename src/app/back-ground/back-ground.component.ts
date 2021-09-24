import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { IAddress } from '../hero';
import { HeroService } from '../hero.service';
import { Dataservice } from '../Services/dataservices';
// import { Data } from '../data';
@Component({
  selector: 'app-back-ground',
  templateUrl: './back-ground.component.html',
  styleUrls: ['./back-ground.component.scss'],
})
export class BackGroundComponent implements OnInit {
  titledata: any = [];
  titledata1: any = [];
  p: number = 1;
  heroes: IAddress[] = [];
  constructor(
    private Dataservice: Dataservice,
    private heroService: HeroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.Dataservice.SearchInput.subscribe((response) => {
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
  }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
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
