import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Champions } from '../models/champions';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CopaFilmesService {

  private URL_COPA_FILMES = 'https://copafilmesapi.azurewebsites.net/api/Movies';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllMovies(): Observable<Movie[]> {
    // const options = {
    //   headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
    // };
    return this.httpClient.get<Movie[]>(this.URL_COPA_FILMES);//, options);
  }

  postSelectedMovies(request: Movie[]): Observable<Champions[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
    };
    return this.httpClient.post<Champions[]>(this.URL_COPA_FILMES, JSON.stringify(request), httpOptions);
  }

}
