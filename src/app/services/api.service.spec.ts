import { TestBed } from '@angular/core/testing';
import { Api } from './api.service';

describe('Api', () => {
  let service: Api;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
