import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlPaneComponent } from './user-control-pane.component';

describe('UserControlPaneComponent', () => {
  let component: UserControlPaneComponent;
  let fixture: ComponentFixture<UserControlPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserControlPaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
