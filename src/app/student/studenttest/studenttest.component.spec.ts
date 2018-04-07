import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenttestComponent } from './studenttest.component';

describe('StudenttestComponent', () => {
  let component: StudenttestComponent;
  let fixture: ComponentFixture<StudenttestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudenttestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
