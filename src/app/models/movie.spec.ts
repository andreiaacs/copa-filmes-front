import { TestBed, async } from '@angular/core/testing';
import { Movie } from './movie';

describe('Instance movie', () => {
  it('should create an instance', () => {
    let movie = new Movie();
    expect(movie).toBeTruthy();
  });
});