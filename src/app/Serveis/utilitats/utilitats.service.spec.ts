import { TestBed } from '@angular/core/testing';

import { UtilitatsService } from './utilitats.service';

describe('UtilitatsService', () => {
  let service: UtilitatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
