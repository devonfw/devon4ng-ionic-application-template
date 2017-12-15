
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { LoginPage } from '../../pages/Login/Login';


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
  @Input() Title : string = "Login";

  constructor(private translate: TranslateService,private navCtrl: NavController, private auth: AuthServiceProvider) {
    translate.setDefaultLang('en');
    this.currentlanguage = 'en'; // 'en by default'
  }

  isauthenthicated() : boolean{
    return this.auth.getAuthenthicated();
  }

  Showlanguage(lang:string) : boolean { //decides if a button should be shown
    if(lang == this.currentlanguage) return false;
    return true;
  }

  togglelanguage(lang: string) : void{
    
    this.translate.use(lang);
    this.currentlanguage = lang;
  }

  

  logout() : void{
    //ionic uses a jwt token for security, we don't need to connect to the server since we don't have a season, erasing the jwt is enough.
    this.auth.setAuthenthicated(false);
    this.auth.setToken("");
    this.navCtrl.setRoot(LoginPage);
  }

}
