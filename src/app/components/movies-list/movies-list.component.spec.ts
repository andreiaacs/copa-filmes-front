import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable, of } from 'rxjs';
import { Champions } from 'src/app/models/champions';
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

  describe('ngOnInit', () => {

    it('loading true', () => {
      const copaFilmesService = TestBed.inject(CopaFilmesService);
      const copaFilmesServiceSpy = spyOn(copaFilmesService, 'getAllMovies').and.callThrough();
  
      const movie1 = new Movie();
      const movie2 = new Movie();
  
      component.movies.push(movie1);
      component.movies.push(movie2);
      component.total = component.movies.length;
      component.loading = true;
  
      component.ngOnInit();
  
      expect(copaFilmesServiceSpy).toHaveBeenCalled();
      expect(component.total).toBe(component.movies.length);
      expect(component.loading).toBe(true);
  
    });

    it('loading false', () => {
      const copaFilmesService = TestBed.inject(CopaFilmesService);
      const copaFilmesServiceSpy = spyOn(copaFilmesService, 'getAllMovies').and.returnValue(of());

      component.movies = [{"id":"tt3606756","titulo":"Os Incríveis 2","ano":2018,"nota":8.5},{"id":"tt4881806","titulo":"Jurassic World: Reino Ameaçado","ano":2018,"nota":6.7},{"id":"tt5164214","titulo":"Oito Mulheres e um Segredo","ano":2018,"nota":6.3},{"id":"tt7784604","titulo":"Hereditário","ano":2018,"nota":7.8},{"id":"tt4154756","titulo":"Vingadores: Guerra Infinita","ano":2018,"nota":8.8},{"id":"tt5463162","titulo":"Deadpool 2","ano":2018,"nota":8.1},{"id":"tt3778644","titulo":"Han Solo: Uma História Star Wars","ano":2018,"nota":7.2},{"id":"tt3501632","titulo":"Thor: Ragnarok","ano":2017,"nota":7.9},{"id":"tt2854926","titulo":"Te Peguei!","ano":2018,"nota":7.1},{"id":"tt0317705","titulo":"Os Incríveis","ano":2004,"nota":8},{"id":"tt3799232","titulo":"A Barraca do Beijo","ano":2018,"nota":6.4},{"id":"tt1365519","titulo":"Tomb Raider: A Origem","ano":2018,"nota":6.5},{"id":"tt1825683","titulo":"Pantera Negra","ano":2018,"nota":7.5},{"id":"tt5834262","titulo":"Hotel Artemis","ano":2018,"nota":6.3},{"id":"tt7690670","titulo":"Superfly","ano":2018,"nota":5.1},{"id":"tt6499752","titulo":"Upgrade","ano":2018,"nota":7.8}];
      component.total = component.movies.length;
      component.loading = false;
  
      component.ngOnInit();
  
      expect(copaFilmesServiceSpy).toHaveBeenCalled();
      expect(component.movies).toEqual([{"id":"tt3606756","titulo":"Os Incríveis 2","ano":2018,"nota":8.5},{"id":"tt4881806","titulo":"Jurassic World: Reino Ameaçado","ano":2018,"nota":6.7},{"id":"tt5164214","titulo":"Oito Mulheres e um Segredo","ano":2018,"nota":6.3},{"id":"tt7784604","titulo":"Hereditário","ano":2018,"nota":7.8},{"id":"tt4154756","titulo":"Vingadores: Guerra Infinita","ano":2018,"nota":8.8},{"id":"tt5463162","titulo":"Deadpool 2","ano":2018,"nota":8.1},{"id":"tt3778644","titulo":"Han Solo: Uma História Star Wars","ano":2018,"nota":7.2},{"id":"tt3501632","titulo":"Thor: Ragnarok","ano":2017,"nota":7.9},{"id":"tt2854926","titulo":"Te Peguei!","ano":2018,"nota":7.1},{"id":"tt0317705","titulo":"Os Incríveis","ano":2004,"nota":8},{"id":"tt3799232","titulo":"A Barraca do Beijo","ano":2018,"nota":6.4},{"id":"tt1365519","titulo":"Tomb Raider: A Origem","ano":2018,"nota":6.5},{"id":"tt1825683","titulo":"Pantera Negra","ano":2018,"nota":7.5},{"id":"tt5834262","titulo":"Hotel Artemis","ano":2018,"nota":6.3},{"id":"tt7690670","titulo":"Superfly","ano":2018,"nota":5.1},{"id":"tt6499752","titulo":"Upgrade","ano":2018,"nota":7.8}]);
      expect(component.total).toBe(component.movies.length);
      expect(component.loading).toBe(false);
  
    });

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

  it('generateChampionship', () => {
    
    const copaFilmesService = TestBed.inject(CopaFilmesService);
    const copaFilmesServiceSpy = spyOn(copaFilmesService, 'postSelectedMovies').and.returnValue(of());

    const localStorage = TestBed.inject(LocalStorage);
    const localStorageSpy = spyOn(localStorage, 'setItem').and.returnValue(of());

    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate').and.callThrough();

    component.generateChampionship();

    expect(copaFilmesServiceSpy).toHaveBeenCalled();
   // expect(localStorageSpy).toHaveBeenCalled();
   // expect(routerSpy).toHaveBeenCalled();
  });
});
