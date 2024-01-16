import { TestBed } from '@angular/core/testing';

import { NgxI18nToolsService } from './translation.service';

describe('NgxI18nToolsService', () => {
  let service: NgxI18nToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxI18nToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
