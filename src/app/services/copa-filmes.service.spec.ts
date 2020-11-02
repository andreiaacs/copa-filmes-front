import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CopaFilmesService } from './copa-filmes.service';

describe('CopaFilmesService', () => {
  let service: CopaFilmesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(CopaFilmesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
