import { TestBed } from '@angular/core/testing';
import { Renderer } from './renderer.service';

describe('Renderer', () => {
  let service: Renderer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Renderer);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
