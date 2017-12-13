
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/security/auth-service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { LoginProvider } from '../../providers/login/loginProvider';
import { HomePage } from '../../pages/home/home';
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
  defaultTitle = "Wrong Title"
  _text: string;
  language= 'EN';
  pages:any;
  @Input() Title : string = "Login";
  @Input()
  set text(newTitle: string) {
      newTitle = newTitle.trim();
      if (newTitle.length === 0) {
          newTitle = this.defaultTitle;
      }
      this._text = newTitle;
  }

  get title() {
      return this._text;
  }

  

  constructor(private translate: TranslateService,private navCtrl: NavController, private auth: AuthServiceProvider, public loginp : LoginProvider) {
    //this._text = 'Hello World';
  }


  togglelanguage(lang: string){
    console.log(lang);
    this.translate.use(lang);
    this.language = lang;
  }

  isauthenthicated(){
    return this.auth.getAuthenthicated();
  }

  logout(){
    this.loginp.IonicAngularLogout();
    console.log(this.auth.getToken());
    this.navCtrl.setRoot(LoginPage);
  }
  currentlanguage(lang: String){
    if( lang == this.language ) {
      return true;
    }
    return false;
  }
}
