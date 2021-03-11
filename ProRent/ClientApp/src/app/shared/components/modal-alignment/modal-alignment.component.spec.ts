import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlignmentComponent } from './modal-alignment.component';

describe('ModalAlignmentComponent', () => {
  let component: ModalAlignmentComponent;
  let fixture: ComponentFixture<ModalAlignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
