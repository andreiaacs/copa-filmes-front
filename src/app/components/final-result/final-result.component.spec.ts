import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Champions } from 'src/app/models/champions';
import { Movie } from 'src/app/models/movie';

import { FinalResultComponent } from './final-result.component';

describe('FinalResultComponent', () => {
  let component: FinalResultComponent;
  let fixture: ComponentFixture<FinalResultComponent>;

  let fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get(): string {
          return '123';
        },
      },
    },
  };

  let httpHandlerStub = {
    handle: () => ({}),
  };

  let localStorageStub = {
    getItem: () => of({}),
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: HttpHandler, useValue: httpHandlerStub },
        { provide: LocalStorage, useValue: localStorageStub },
      ],
      declarations: [FinalResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('loading is true', () => {
      const localStorage = TestBed.inject(LocalStorage);
      const localStorageSpy = spyOn(localStorage, 'getItem').and.callThrough();

      component.loading = true;

      component.ngOnInit();

      expect(localStorageSpy).toHaveBeenCalled();
      expect(component.loading).toBe(false);
    });

    it('loading is false', () => {
      const localStorage = TestBed.inject(LocalStorage);
      const localStorageSpy = spyOn(localStorage, 'getItem').and.callThrough();

      component.loading = false;

      component.ngOnInit();

      expect(localStorageSpy).toHaveBeenCalled();
      expect(component.loading).toBe(false);
    });

    
  });



});
