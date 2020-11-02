import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { FinalResultComponent } from './components/final-result/final-result.component';
import { HttpClientModule } from '@angular/common/http';
import { CopaFilmesService } from './services/copa-filmes.service';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    FinalResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CopaFilmesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
