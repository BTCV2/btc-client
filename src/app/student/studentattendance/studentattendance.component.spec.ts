import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentattendanceComponent } from './studentattendance.component';

describe('StudentattendanceComponent', () => {
  let component: StudentattendanceComponent;
  let fixture: ComponentFixture<StudentattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
