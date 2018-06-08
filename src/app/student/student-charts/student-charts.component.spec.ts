import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentChartsComponent } from './student-charts.component';

describe('StudentChartsComponent', () => {
  let component: StudentChartsComponent;
  let fixture: ComponentFixture<StudentChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
