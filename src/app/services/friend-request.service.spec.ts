import { TestBed } from '@angular/core/testing';

import { FriendRequestService } from './friend-request.service';

describe('FriendRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendRequestService = TestBed.get(FriendRequestService);
    expect(service).toBeTruthy();
  });
});
