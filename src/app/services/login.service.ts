import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResultModel } from '../model/LoginResultModel';
import { Router } from '@angular/router';

const ROLE = 'ROLE';
const USER = 'USER';
const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(blockchainURL: string, userName: string, password: string): Observable<LoginResultModel>{    
                     
    let tsuLoginUrl = blockchainURL + '/tsu/login';     
    let headers = new HttpHeaders().set('Content-Type','application/json');        
    let data = {
      userName: userName,
      password: password
    }
    return this.http.post<LoginResultModel> (tsuLoginUrl, data, {headers: headers});  
  } 

  logout(): void {    
    localStorage.removeItem(TOKEN); 
    localStorage.removeItem(ROLE); 
    localStorage.removeItem(USER); 
    this.router.navigate(["login"]); 
  } 

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);    
  }

  setRole(role: string): void {
    localStorage.setItem(ROLE, role);    
  }

  setUser(user: string): void {
    localStorage.setItem(USER, user);    
  }

  getRole(): any {
    return localStorage.getItem(ROLE);    
  }

  getUser(): any {
    return localStorage.getItem(USER);    
  }

  isAdmin(): boolean {
    return (this.getRole() == 'admin')
  }

  isLogged() {    
    return localStorage.getItem(USER) != null && localStorage.getItem(TOKEN) != null;
  }
}
