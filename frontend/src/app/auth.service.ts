import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false; 
    }
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(new Date().getTime() / 1000);
    
    if (tokenPayload.exp && tokenPayload.exp < currentTime) {
      return false; 
    }

    return true; 
  }
}
