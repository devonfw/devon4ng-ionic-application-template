import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for m  setToken(arg0: any): any {
    throw new Error("Method not implemented.");
  }  setToken(arg0: any): any {
    throw new Error("Method not implemented.");
  }

ore info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  authenticated : boolean = false;
  username : string = ''; //not used for now, could be used in the future.
  token : string = '';

  constructor(public http: HttpClient) {
    this.authenticated = false;
    //console.log('Hello AuthServiceProvider Provider');
  }

  getAuthenticated() : boolean{
    return this.authenticated;
  }

  setAuthenticated(state: boolean) : void{
    this.authenticated = state;
  }

  getToken() : string{
    return this.token;
  }

  setToken(state: string) : void{
    this.token = state;
  }

  getUsername(): string{
    return this.username;
  }

  setUsername(name : string): void{
    this.username = name;
  }

}
