import { TestBed } from '@angular/core/testing';

import { RegisterManagerService } from './register-manager.service';

describe('RegisterManagerService', () => {
  let service: RegisterManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
