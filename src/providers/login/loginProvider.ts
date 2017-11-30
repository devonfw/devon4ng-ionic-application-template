import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HTTP } from '@ionic-native/http';
import { AuthServiceProvider } from '../security/auth-service'
import { BussinessOperatorProvider } from '../shared/bussiness-operator'
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  

  data : any;
  header = '';


  constructor(public http: HttpClient, public authservice : AuthServiceProvider ,  private BO: BussinessOperatorProvider) {
    this.http = http;
    //this.httpIonic= httpIonic;
    this.data = null;
  }

 
  getCsrf(): Observable<any> {
    return this.http.get("http://localhost:8081/oasp4j-sample-server/services/rest/security/v1/csrftoken");
  }


  IonicAngularLogout(): any {
    return new Promise(resolve => {
      this.http.post(this.BO.logout(), 
        {}, 
        {responseType: "text"}).subscribe(data => { 
          //angular by default, asks for a json, if you have no body, it would give an error when parsing, thus we need {responseType: "text"} 
            // auth.service management
            this.authservice.setUsername("");
            this.authservice.setAuthenthicated(false);
            console.log("out");
          }, err => {
            console.log(err);
          });
    });
  }

  // http angular
  IonicAngularLogin(login , password) :Observable<any>  {
    let a = {username: login, password: password};
    console.log(login);
    console.log(password);
      return this.http.post( this.BO.login() , //url
        {username: login,password: password}, //body
          {responseType: "text"});

      }

  login(loginparams : any): Observable<any> {
    // this calls a function that connects to a rest service
    return this.IonicAngularLogin(loginparams.username, loginparams.password) 
  }

  logout(): void {
    this.IonicAngularLogout();
  }

  authenticated(): boolean{
    // console.log(this.logged);
    return true;
  }


}
