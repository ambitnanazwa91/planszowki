import { TestBed } from '@angular/core/testing';

import { BggDataService } from './bgg-data.service';

describe('BggDataService', () => {
  let service: BggDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BggDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
