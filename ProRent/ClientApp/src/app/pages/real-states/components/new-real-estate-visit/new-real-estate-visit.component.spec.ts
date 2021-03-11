import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRealEstateVisitComponent } from './new-real-estate-visit.component';

describe('NewRealEstateVisitComponent', () => {
  let component: NewRealEstateVisitComponent;
  let fixture: ComponentFixture<NewRealEstateVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRealEstateVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRealEstateVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
