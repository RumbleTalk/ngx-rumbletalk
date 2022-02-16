import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRumbletalkComponent } from './ngx-rumbletalk.component';

describe('NgxRumbletalkComponent', () => {
  let component: NgxRumbletalkComponent;
  let fixture: ComponentFixture<NgxRumbletalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxRumbletalkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRumbletalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
