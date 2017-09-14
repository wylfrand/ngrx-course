import { TestBed, inject } from '@angular/core/testing';

import { LoadThreadEffectService } from './load-thread-effect.service';

describe('LoadThreadEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadThreadEffectService]
    });
  });

  it('should ...', inject([LoadThreadEffectService], (service: LoadThreadEffectService) => {
    expect(service).toBeTruthy();
  }));
});
