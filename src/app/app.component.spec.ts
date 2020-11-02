import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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

  xit('ngOnInit', () => {
    const event = new NavigationEnd(42, '/', '/');
    //const router = TestBed.get(Router).events.next(event);
    const route = TestBed.inject(ActivatedRoute);
    
    component.title = 'teste';//route.root.firstChild.snapshot.data.title;
    component.description = 'teste';//route.root.firstChild.snapshot.data.description;

    component.ngOnInit();

    expect(component.title).toBe('teste');
    expect(component.description).toBe('teste');

  })

});
