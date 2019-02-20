
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { LoginPage } from '../../pages/login/login';


/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'layoutheader',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  currentlanguage: string;
  langs = ['en','es'];
  @Input() Title : string;

  constructor(private translate: TranslateService,private navCtrl: NavController, private auth: AuthServiceProvider) {
    translate.currentLang = translate.currentLang == undefined ? "en" : translate.currentLang;
    translate.setDefaultLang(translate.currentLang);
    this.currentlanguage = translate.currentLang; // 'en by default'
  }

  isAuthenticated() : boolean{
    return this.auth.getAuthenticated();
  }

  Showlanguage(lang:string) : boolean { //decides if a button should be shown
    if(lang == this.currentlanguage) return true;
    return false;
  }

  togglelanguage(lang: string) : void{
        
    let index = this.langs.indexOf(lang);
    if (index + 1 == this.langs.length) index = 0;
    else index++;

    this.translate.use(this.langs[index]);
    this.currentlanguage = this.langs[index];
  }

  logout() : void{
    //ionic uses a jwt token for security, we don't need to connect to the server since we don't have a season, erasing the jwt is enough.
    this.auth.setAuthenticated(false);
    this.auth.setToken("");
    this.navCtrl.setRoot(LoginPage);
  }

}
