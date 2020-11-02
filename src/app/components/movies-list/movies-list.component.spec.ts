import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { CopaFilmesService } from 'src/app/services/copa-filmes.service';

import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  let routerStub = {
    navigate: () => ({}),
  }

  let httpHandlerStub = {
    handle: () => ({}),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        CopaFilmesService,
        { provide: Router, useValue: routerStub },
        { provide: HttpHandler, useValue: httpHandlerStub },
        LocalStorage
      ],
      declarations: [MoviesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const copaFilmesService = TestBed.inject(CopaFilmesService);
    const copaFilmesServiceSpy = spyOn(copaFilmesService, 'getAllMovies').and.callThrough();

    const movie1 = new Movie();
    const movie2 = new Movie();

    component.movies.push(movie1);
    component.movies.push(movie2);
    component.total = component.movies.length;
    component.loading = false;

    component.ngOnInit();

    expect(copaFilmesServiceSpy).toHaveBeenCalled();
    expect(component.total).toBe(component.movies.length);
    expect(component.loading).toBe(false);

  });

  describe('changed', () => {
    it('evt.target.checked true e this.selected !== 8', () => {
      const movie1 = new Movie();
      const movie2 = new Movie();

      component.selectedMovies.push(movie1);
      component.selectedMovies.push(movie2);

      component.selected = 8;

      const evt = {
        target: {
          checked: true
        }
      };
      const movie = {};


      component.changed(evt, movie);

      expect(component.selectedMovies[0]).toBe(movie1);
      expect(component.selectedMovies[1]).toBe(movie2);
      expect(component.selected).toBe(3);
      expect(evt.target.checked).toBe(true);
    });

    it('evt.target.checked false e this.selected !== 8', () => {
      const movie1 = new Movie();
      const movie2 = new Movie();

      component.selectedMovies.push(movie1);
      component.selectedMovies.push(movie2);

      component.selected = 8;

      const evt = {
        target: {
          checked: false
        }
      };

      movie1.id = 'tt3606756';
      const movie = {
        id: 'tt3606756',
      };

      component.disable = true;

      component.selectedMovies = component.selectedMovies.filter(function (m) { return m.id != movie.id });

      component.changed(evt, movie);

      expect(component.selectedMovies[0]).toBe(movie2);
      expect(component.selected).toBe(1);
      expect(evt.target.checked).toBe(false);
      expect(component.disable).toBe(true);
    });

    it('evt.target.checked true e this.selected === 8', () => {
      const movie1 = new Movie();
      const movie2 = new Movie();
      const movie3 = new Movie();
      const movie4 = new Movie();
      const movie5 = new Movie();
      const movie6 = new Movie();
      const movie7 = new Movie();

      component.selectedMovies.push(movie1);
      component.selectedMovies.push(movie2);
      component.selectedMovies.push(movie3);
      component.selectedMovies.push(movie4);
      component.selectedMovies.push(movie5);
      component.selectedMovies.push(movie6);
      component.selectedMovies.push(movie7);

      component.selected = 8;

      const evt = {
        target: {
          checked: true
        }
      };
      const movie = {};

      component.changed(evt, movie);

      expect(component.selectedMovies[0]).toBe(movie1);
      expect(component.selectedMovies[1]).toBe(movie2);
      expect(component.selectedMovies[2]).toBe(movie3);
      expect(component.selectedMovies[3]).toBe(movie4);
      expect(component.selectedMovies[4]).toBe(movie5);
      expect(component.selectedMovies[5]).toBe(movie6);
      expect(component.selectedMovies[6]).toBe(movie7);
      expect(component.selected).toBe(8);
      expect(evt.target.checked).toBe(true);
    });

    it('evt.target.checked false e this.selected === 8', () => {
      const movie1 = new Movie();
      const movie2 = new Movie();
      const movie3 = new Movie();
      const movie4 = new Movie();
      const movie5 = new Movie();
      const movie6 = new Movie();
      const movie7 = new Movie();

      component.selectedMovies.push(movie1);
      component.selectedMovies.push(movie2);
      component.selectedMovies.push(movie3);
      component.selectedMovies.push(movie4);
      component.selectedMovies.push(movie5);
      component.selectedMovies.push(movie6);
      component.selectedMovies.push(movie7);

      component.selected = 8;

      const evt = {
        target: {
          checked: false
        }
      };
      movie7.id = 'tt3606756';
      const movie = {
        id: 'tt3606756',
      };

      component.disable = true;

      component.selectedMovies = component.selectedMovies.filter(function (m) { return m.id != movie.id });

      component.changed(evt, movie);

      expect(component.selectedMovies[0]).toBe(movie1);
      expect(component.selectedMovies[1]).toBe(movie2);
      expect(component.selectedMovies[2]).toBe(movie3);
      expect(component.selectedMovies[3]).toBe(movie4);
      expect(component.selectedMovies[4]).toBe(movie5);
      expect(component.selectedMovies[5]).toBe(movie6);
      expect(component.selected).toBe(6);
      expect(evt.target.checked).toBe(false);
      expect(component.disable).toBe(true);
    });
  });
});
