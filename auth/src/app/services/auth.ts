import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry, tap } from 'rxjs';

interface LoginResponse{
  token:string;
}
@Injectable({
  providedIn: 'root',
})


export class Auth {
  private API = "http://localhost:4000/api/v1";

  constructor(private http:HttpClient){}
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable()
  register(data:any){
    console.log(data)
    return this.http.post(`${this.API}/auth/register`,data);
  };
  login(data:any){
    return this.http.post<LoginResponse>(`${this.API}/auth/login`,data)
    .pipe(tap((res)=>{
      localStorage.setItem('token',res?.token)
    }))
  };

  logout(){
    localStorage.removeItem('token')
  };
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }

 getProfile(): Observable<any> {
    // If the user data already exists, return the cached data
    if (this.userSubject.value) {
      return this.user$;
    }

    // Otherwise, fetch the user profile from the API
    return this.http.get(`${this.API}/auth/me`).pipe(
      tap((user) => {
        console.log('Profile fetched:', user);
        this.userSubject.next(user); // Cache the user data
      })
    );
  }

  // Get the current user data from the BehaviorSubject
  getCurrentUser() {
    return this.userSubject.value;
  }
}
