import { TestBed } from '@angular/core/testing';

import { ActivityServices } from './activity-services';

describe('ActivityServices', () => {
  let service: ActivityServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
