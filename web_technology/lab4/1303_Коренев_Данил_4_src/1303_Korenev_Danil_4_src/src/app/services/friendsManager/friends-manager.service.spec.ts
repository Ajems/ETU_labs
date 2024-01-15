import { TestBed } from '@angular/core/testing';

import { FriendsManagerService } from './friends-manager.service';

describe('FriendsManagerService', () => {
  let service: FriendsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
