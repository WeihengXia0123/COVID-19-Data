import { TestBed } from '@angular/core/testing';

import { AuthSignedInGuard } from './auth-signed-in.guard';

describe('AuthSignedInGuard', () => {
  let guard: AuthSignedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSignedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
