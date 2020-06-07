import { Injectable } from '@angular/core';
import { Callback } from '../_models/logincallback';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_TYPE = 'token';

  // Actual callback object:
  logincallback: Callback

  private isLoggedIn: boolean;

  constructor() { 

    this.isLoggedIn = false;

    this.logincallback = new Callback();
    this.logincallback.token_type = this.TOKEN_TYPE;
    this.logincallback.state = '';

  }

  SetCallback(token: string, expires_in: number)
  {
    this.logincallback.access_token = token;
    this.logincallback.expires_in = expires_in;

    this.isLoggedIn = true;
  }

  GetCallback() : Callback
  {
    return this.logincallback;
  }

  IsLoggedIn() : boolean
  {
    return this.isLoggedIn;
  }

  Logout()
  {

    this.isLoggedIn = false;

    // Nullify the user data:
    this.logincallback.access_token = '';
    this.logincallback.expires_in = 0;
  }

}
