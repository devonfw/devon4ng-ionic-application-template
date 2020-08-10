import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/authorization/auth-guard.service';
import { AuthService } from './services/security/auth.service';
import { TranslocoRootModule } from './transloco-root.module';

import { Subscription, of } from 'rxjs';

class BackButton {
  constructor() {}

  subscribeWithPriority(): Subscription {
    return of(null).subscribe();
  }
}

class MockPlatform {
  backButton = new BackButton();

  constructor() {}

  ready(): Promise<string> {
    return Promise.resolve('dom');
  }
}

describe('AppComponent', () => {
  let authGuardSpy: any;
  let authSpy: any;
  let platform: Platform;

  beforeEach(async(() => {
    authGuardSpy = jasmine.createSpyObj('AuthGuardService', ['canActivate']);
    authSpy = jasmine.createSpyObj('AuthService', ['canActivate']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserModule,
        AppRoutingModule,
        TranslocoRootModule,
      ],
      providers: [
        { provide: Platform, useClass: MockPlatform },
        { provide: AuthGuardService, useValue: authGuardSpy },
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    platform = TestBed.inject(Platform);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    spyOn(platform, 'ready').and.callThrough();
    TestBed.createComponent(AppComponent);
    expect(platform.ready).toHaveBeenCalled();
  });
});
