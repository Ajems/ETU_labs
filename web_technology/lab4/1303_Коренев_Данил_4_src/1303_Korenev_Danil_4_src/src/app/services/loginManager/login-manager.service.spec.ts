import { TestBed } from '@angular/core/testing';

import { LoginManagerService } from './login-manager.service';

describe('LoginManagerService', () => {
  let service: LoginManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
