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
  IonicAngularLogin(login,password){
    let a = {j_username: login,j_password: password};
    return new Promise(resolve => {
      this.http.post( this.BO.login() , //url
        {j_username: login,j_password: password}, //body
          {responseType: "text"}).subscribe(data => { //angular http expects json by default
        this.authservice.setAuthenthicated(true);
        this.authservice.setUsername(login);
        console.log(data);
      }, err => {
        console.log(err);

      });
    });
      }

  login(loginparams : any): any {
    // this calls a function that connects to a rest service
    this.IonicAngularLogin(loginparams.name,loginparams.password) 
  }

  logout(): void {
    this.IonicAngularLogout();
  }

  authenticated(): boolean{
    // console.log(this.logged);
    return true;
  }


}
