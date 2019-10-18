import { TestBed } from '@angular/core/testing';

import { NgxRumbletalkService } from './ngx-rumbletalk.service';

describe('NgxRumbletalkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxRumbletalkService = TestBed.get(NgxRumbletalkService);
    expect(service).toBeTruthy();
  });
});
