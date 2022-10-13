import { TestBed } from '@angular/core/testing';
import { Gui } from './gui.service';

describe('Gui', () => {
  let service: Gui;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gui);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
