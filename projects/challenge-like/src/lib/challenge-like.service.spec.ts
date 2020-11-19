import { TestBed } from '@angular/core/testing';

import { ChallengeLikeService } from './challenge-like.service';

describe('ChallengeLikeService', () => {
  let service: ChallengeLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
