import { TestBed } from '@angular/core/testing';

import { UsersListManagerService } from './users-list-manager.service';

describe('UsersListManagerService', () => {
  let service: UsersListManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
