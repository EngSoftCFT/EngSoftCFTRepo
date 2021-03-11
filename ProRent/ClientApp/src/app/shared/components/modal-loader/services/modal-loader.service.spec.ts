import { TestBed } from '@angular/core/testing';

import { ModalLoaderService } from './modal-loader.service';

describe('ModalLoaderService', () => {
  let service: ModalLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
