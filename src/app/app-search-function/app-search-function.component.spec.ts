import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSearchFunctionComponent } from './app-search-function.component';

describe('AppSearchFunctionComponent', () => {
  let component: AppSearchFunctionComponent;
  let fixture: ComponentFixture<AppSearchFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSearchFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSearchFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
