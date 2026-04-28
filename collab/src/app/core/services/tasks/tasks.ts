import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastService } from '../toast/toast-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Tasks {

  private http = inject(HttpClient);

  constructor(private toast:ToastService){}

// update task status only
    UpdateTask(taskId:string,data:any):Observable<any>{
      return this.http.put(`${environment.apiUrl}/task/${taskId}`,data)
    }

// update exact task
    UpdateExactTask(taskId:string,data:any):Observable<any>{
      return this.http.put(`${environment.apiUrl}/task/${taskId}`,data)
    }
  
    getTAsks(projectId:string):Observable<any>{
      console.log(projectId)
      return this.http.get(`${environment.apiUrl}/task?projectId=${projectId}`)
    }
  
    createTask(data:any):Observable<any>{
      return this.http.post(`${environment.apiUrl}/task`,data)
    }
  

}
