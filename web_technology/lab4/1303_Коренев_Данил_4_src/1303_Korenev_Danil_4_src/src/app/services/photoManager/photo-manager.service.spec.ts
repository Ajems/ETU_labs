import { TestBed } from '@angular/core/testing';

import { PhotoManagerService } from './photo-manager.service';

describe('PhotoManagerService', () => {
  let service: PhotoManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
