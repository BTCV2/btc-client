import { TestBed, inject } from '@angular/core/testing';

import { SyllabusService } from './syllabus.service';

describe('SyllabusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SyllabusService]
    });
  });

  it('should be created', inject([SyllabusService], (service: SyllabusService) => {
    expect(service).toBeTruthy();
  }));
});
