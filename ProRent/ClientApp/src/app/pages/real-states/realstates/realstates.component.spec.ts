import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealstatesComponent } from './realstates.component';

describe('RealstatesComponent', () => {
  let component: RealstatesComponent;
  let fixture: ComponentFixture<RealstatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealstatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
