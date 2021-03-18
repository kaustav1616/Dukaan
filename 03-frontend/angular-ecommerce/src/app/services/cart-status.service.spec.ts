import { TestBed } from '@angular/core/testing';

import { CartStatusService } from './cart-status.service';

describe('CartStatusService', () => {
  let service: CartStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
