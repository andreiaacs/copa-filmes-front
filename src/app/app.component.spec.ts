import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let activatedRouteStub = {
    root: {
      firstChild: {
        snapshot: {
          paramMap: {
            get(): string {
              return '123';
            },
          },
          data: {
            title: 'teste',
            description: 'teste'
          }
        },
      },
    },
  };

  let routerStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('ngOnInit', () => {
    let eventsSub = new BehaviorSubject<any>(null);

    let routerStub = {
      events: eventsSub
    }

    let homeNav = new NavigationEnd(1, 'home', 'home');

    eventsSub.next(homeNav);

  })

});
