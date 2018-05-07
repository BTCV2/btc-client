import { TestBed, inject } from '@angular/core/testing';

import { SetPasswordService } from './set-password.service';

describe('SetPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetPasswordService]
    });
  });

  it('should be created', inject([SetPasswordService], (service: SetPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
