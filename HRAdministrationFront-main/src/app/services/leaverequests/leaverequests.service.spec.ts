import { TestBed } from '@angular/core/testing';

import { LeaveRequestsService } from './leaverequests.service';

describe('LeaverequestsService', () => {
  let service: LeaveRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
