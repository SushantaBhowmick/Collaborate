import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from './toast/toast-service';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private API = 'http://localhost:4000/api/v1/auth'
  constructor(private toast:ToastService){}

  register(data:any):Observable<any>{
    return this.http.post(`${this.API}/register`,data)
  }
  login(data:any):Observable<any>{
    return this.http.post(`${this.API}/login`,data)
  }

  getMe():Observable<any>{
    return this.http.get(`${this.API}/me`)
  }

  logout(){
   localStorage.removeItem('token');
   this.toast.success("Logout successfully")
  }
}
