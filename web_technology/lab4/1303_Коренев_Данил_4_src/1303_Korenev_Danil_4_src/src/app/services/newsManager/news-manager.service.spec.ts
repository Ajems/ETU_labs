import { TestBed } from '@angular/core/testing';

import { NewsManagerService } from './news-manager.service';

describe('NewsManagerService', () => {
  let service: NewsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
