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

  authenthicated : boolean = false;
  username : string = '';
  token : string = '';

  constructor(public http: HttpClient) {
    this.authenthicated = false;
    this.username = '';
    //console.log('Hello AuthServiceProvider Provider');
  }

  setAuthenthicated(state: boolean) : void{
    this.authenthicated = state;
  }

  getAuthenthicated() : boolean{
    return this.authenthicated;
  }

  setToken(state: string) : void{
    this.token = state;
  }

  getToken() : string{
    return this.token;
  }

  setUsername(name : string): void{
    this.username = name;
  }

  getUsername(): string{
    return this.username;
  }
}
