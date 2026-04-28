import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentServices {

  private http = inject(HttpClient);

  getComments(taskId:string):Observable<any>{
    return this.http.get(`${environment.apiUrl}/comments/${taskId}`)
  }

  addComment(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/comments`,data)
  }


}
