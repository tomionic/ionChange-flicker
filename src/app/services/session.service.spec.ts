import { TestBed } from '@angular/core/testing';
import { Session } from './session.service';

describe('Session', () => {
  let service: Session;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Session);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
