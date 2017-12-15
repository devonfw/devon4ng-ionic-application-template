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
  username : string = ''; //not used for now, could be used in the future.
  token : string = '';

  constructor(public http: HttpClient) {
    this.authenthicated = false;
    //console.log('Hello AuthServiceProvider Provider');
  }

  getAuthenthicated() : boolean{
    return this.authenthicated;
  }

  setAuthenthicated(state: boolean) : void{
    this.authenthicated = state;
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
