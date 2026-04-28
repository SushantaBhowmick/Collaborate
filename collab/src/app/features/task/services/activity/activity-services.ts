import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityServices {



  private http = inject(HttpClient);

  getActivities(taskId:string):Observable<any>{
    return this.http.get(`${environment.apiUrl}/activity/${taskId}`)
  }


}
