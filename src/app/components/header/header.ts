import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { AuthService } from '../../services/security/auth.service';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'app-layout-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss'],
})
export class HeaderComponent {
  @Input() title: string;
  currentLanguage: string;
  langs: AvailableLangs;

  constructor(
    private translocoService: TranslocoService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.langs = translocoService.getAvailableLangs();
    translocoService.langChanges$.subscribe(
      (lang) => (this.currentLanguage = lang),
    );
  }

  isAuthenticated(): boolean {
    return this.auth.getAuthenticated();
  }

  toggleLanguage(): void {
    for (const lang of this.langs) {
      if (typeof lang === 'string' && this.currentLanguage !== lang) {
        this.translocoService.setActiveLang(lang);
        break;
      }

      if (typeof lang === 'object' && this.currentLanguage !== lang.id) {
        this.translocoService.setActiveLang(lang.id);
        break;
      }
    }
  }

  logout(): void {
    // ionic uses a jwt token for security, we don't need to connect to the server since we don't have a season, erasing the jwt is enough.
    this.auth.setAuthenticated(false);
    this.auth.setToken('');
    this.router.navigate(['']);
  }
}
