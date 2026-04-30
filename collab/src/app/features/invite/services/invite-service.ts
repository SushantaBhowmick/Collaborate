import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InviteService {

  private http = inject(HttpClient)
  
  createInvite(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/invites`,data);
  }
  
  acceptInvite(token:string,data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/invites/accept/${token}`,data);
  }
  getInvitesUserlist():Observable<any>{
    return this.http.get(`${environment.apiUrl}/invites`);
  }


  

}
