import { TestBed } from '@angular/core/testing';

import { BishopricService } from './bishopric.service';

describe('BishopricService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BishopricService = TestBed.get(BishopricService);
    expect(service).toBeTruthy();
  });
});
