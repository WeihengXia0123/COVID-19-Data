import { TestBed } from '@angular/core/testing';

import { AuthNewsService } from './auth-news.service';

describe('AuthNewsService', () => {
  let service: AuthNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
