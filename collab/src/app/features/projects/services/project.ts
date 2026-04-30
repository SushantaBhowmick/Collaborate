import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProjectType } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class Project {
  private http = inject(HttpClient);

  getProjects(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects`);
  }

  createProject(data: any): Observable<ProjectType> {
    return this.http.post<ProjectType>(`${environment.apiUrl}/projects/create`, data);
  }

  addMember(projectId: string, userId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/add-member`, {userId});
  }
}
