import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Champions } from 'src/app/models/champions';
import { Movie } from 'src/app/models/movie';
import { CopaFilmesService } from '../../services/copa-filmes.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  public title = 'Fase de Seleção';
  public description = 'Selecione 8 filmes que você deseja que entrem na competição e depois pressione o<br>botão Gerar Meu Campeonato para prosseguir.';
  public movies: Movie[] = [];
  public loading: boolean = true;
  public selected: number = 0;
  public total: number;
  public selectedMovies: Movie[] = [];
  public disable = false;

  constructor(
    private readonly copaFilmesService: CopaFilmesService,
    private readonly router: Router,
    private localStorage: LocalStorage,
  ) { }

  ngOnInit(): void {
    this.copaFilmesService
      .getAllMovies()
      .pipe()
      .subscribe(
        (movies) => {
          this.movies = movies;
          this.total = movies.length;
          this.loading = false;
        },
        (erro) => {
          console.log('ERRO: ', erro)
        },
      );
  }

  changed(evt, movie) {
    if (evt.target.checked) this.selectedMovies.push(movie);
    else this.selectedMovies = this.selectedMovies.filter(function (m) { return m.id != movie.id });
    this.selected = this.selectedMovies.length;
    if (this.selected === 8) this.disable = true;
    console.log(this.selectedMovies);
  }

  generateChampionship(): void {
    this.copaFilmesService
      .postSelectedMovies(this.selectedMovies)
      .pipe()
      .subscribe(
        (res) => {
          console.log('res: ', res);
          this.localStorage.setItem('champions', res).subscribe((s) => {
            console.log('storage: ', s);
            this.router.navigate(['/result']);
          }); 
        });
  }



}
