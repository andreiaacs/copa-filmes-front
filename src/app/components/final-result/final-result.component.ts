import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { first } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Champions } from 'src/app/models/champions';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.css']
})
export class FinalResultComponent implements OnInit {

  public champions: Champions = new Champions();
  public loading: boolean = true;

  constructor(
    private localStorage: LocalStorage
  ) { }

  ngOnInit(): void {
    this.localStorage.getItem('champions').subscribe((champions: Champions) => {
      console.log('get champions: ', champions);
      this.champions = champions;
      this.loading = false;
    });
  }

}
