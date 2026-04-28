import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from './toast/toast-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  constructor(private toast:ToastService){}

  register(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/register`,data)
  }
  login(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/login`,data)
  }

  getMe():Observable<any>{
    return this.http.get(`${environment.apiUrl}/auth/me`)
  }

  logout(){
   localStorage.removeItem('token');
   this.toast.success("Logout successfully")
  }
}
