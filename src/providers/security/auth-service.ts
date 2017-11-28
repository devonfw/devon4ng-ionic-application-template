import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  authenthicated : boolean = false;
  username : string = '';

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

  setUsername(name : string): void{
    this.username = name;
  }

  getUsername(): string{
    return this.username;
  }
}
