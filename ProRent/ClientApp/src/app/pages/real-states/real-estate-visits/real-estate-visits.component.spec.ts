import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateVisitsComponent } from './real-estate-visits.component';

describe('RealEstateVisitsComponent', () => {
  let component: RealEstateVisitsComponent;
  let fixture: ComponentFixture<RealEstateVisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealEstateVisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
