import { TestBed, inject } from '@angular/core/testing';

import { NgxRumbletalkService } from './ngx-rumbletalk.service';

describe('NgxRumbletalkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxRumbletalkService],
    });
  });

  it('should be created', inject([NgxRumbletalkService], (service: NgxRumbletalkService) => {
    expect(service).toBeTruthy();
  }));
});
