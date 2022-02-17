import { TestBed } from '@angular/core/testing';

import { NgxRumbletalkService } from './ngx-rumbletalk.service';

describe('NgxRumbletalkService', () => {
  let service: NgxRumbletalkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRumbletalkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
