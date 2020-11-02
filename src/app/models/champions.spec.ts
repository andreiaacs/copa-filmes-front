import { TestBed, async } from '@angular/core/testing';
import { Champions } from './champions';

describe('Instance champion', () => {
  it('should create an instance', () => {
    let champions = new Champions();
    expect(champions).toBeTruthy();
  });
});