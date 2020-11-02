import { TestBed } from '@angular/core/testing';

import { VehicleNouService } from './vehicle-nou.service';

describe('VehicleNouService', () => {
  let service: VehicleNouService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleNouService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
