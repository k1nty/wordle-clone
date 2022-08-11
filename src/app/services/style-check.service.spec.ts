import { TestBed } from '@angular/core/testing';

import { StyleCheckService } from './style-check.service';

describe('StyleCheckService', () => {
  let service: StyleCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
