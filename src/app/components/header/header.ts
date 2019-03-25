import { AuthServiceProvider } from '../../services/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'layoutheader',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
})
export class HeaderComponent {
  currentlanguage = 'en';
  langs = ['en', 'es'];
  @Input() Title: string;

  constructor(
    private translate: TranslateService,
    private auth: AuthServiceProvider,
    private router: Router,
  ) {
    if (typeof translate.currentLang === 'undefined') {
      translate.currentLang = 'en';
    }
    translate.setDefaultLang(translate.currentLang);
  }

  isAuthenticated(): boolean {
    return this.auth.getAuthenticated();
  }

  getCurrentLanguage(): string {
    if (this.translate) {
      return this.translate.currentLang;
    }

    return 'en';
  }

  togglelanguage(): void {
    let index = this.langs.indexOf(this.translate.currentLang);
    index = (index + 1) % this.langs.length;

    this.translate.use(this.langs[index]);
  }

  logout(): void {
    // ionic uses a jwt token for security, we don't need to connect to the server since we don't have a season, erasing the jwt is enough.
    this.auth.setAuthenticated(false);
    this.auth.setToken('');
    this.router.navigate(['']);
  }
}
