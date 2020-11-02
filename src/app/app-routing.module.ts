import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalResultComponent } from './components/final-result/final-result.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent, data: { title: 'Fase de Seleção', description: 'Selecione 8 filmes que você deseja que entrem na competição e depois pressione o<br>botão Gerar Meu Campeonato para prosseguir.' } },
  { path: 'result', component: FinalResultComponent, data: { title: 'Resultado Final', description: 'Veja o resultado final do Campeonato de filmes de forma simples e rápida' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
