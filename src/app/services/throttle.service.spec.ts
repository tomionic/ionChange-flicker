import { TestBed } from '@angular/core/testing';
import { Throttle } from './throttle.service';

describe('Throttle', () => {
  let service: Throttle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Throttle);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
