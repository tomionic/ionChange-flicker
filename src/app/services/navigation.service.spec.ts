import { TestBed } from '@angular/core/testing';
import { Navigation } from './navigation.service';

describe('Navigation', () => {
  let service: Navigation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Navigation);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
