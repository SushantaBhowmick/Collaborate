import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  private http = inject(HttpClient)

  getUsers():Observable<any>{
    return this.http.get(`${environment.apiUrl}/users/getAllUsers`)
  }
}
