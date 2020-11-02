import { HttpClient, HttpHandler } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { Movie } from '../models/movie';

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

  it('postSelectedMovies', () => {
    const httpClient = TestBed.inject(HttpClient);
    const httpClientSpy = spyOn(httpClient, 'post').and.callThrough();

    const request = [];

    const movie1 = new Movie();
    const movie2 = new Movie();

    request.push(movie1);
    request.push(movie2);

    service.postSelectedMovies(request);

    expect(httpClientSpy).toHaveBeenCalled();
  })
});
