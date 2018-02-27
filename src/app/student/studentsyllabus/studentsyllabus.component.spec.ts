import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsyllabusComponent } from './studentsyllabus.component';

describe('StudentsyllabusComponent', () => {
  let component: StudentsyllabusComponent;
  let fixture: ComponentFixture<StudentsyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsyllabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
