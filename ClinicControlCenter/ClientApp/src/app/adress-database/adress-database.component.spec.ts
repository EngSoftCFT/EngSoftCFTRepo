import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressDatabaseComponent } from './adress-database.component';

describe('AdressDatabaseComponent', () => {
  let component: AdressDatabaseComponent;
  let fixture: ComponentFixture<AdressDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
