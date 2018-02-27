import { TestBed, inject } from '@angular/core/testing';

import { AdminStudentService } from './admin-student.service';

describe('AdminStudentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminStudentService]
    });
  });

  it('should be created', inject([AdminStudentService], (service: AdminStudentService) => {
    expect(service).toBeTruthy();
  }));
});
