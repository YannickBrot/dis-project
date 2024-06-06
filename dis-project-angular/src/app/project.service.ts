import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './model/project';
import { Bucket } from './model/bucket';
import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:4200/api/projects';
  private taskApiUrl = 'http://localhost:4200/api/tasks';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(project: Project): Observable<Project> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Project>(this.apiUrl, project, { headers });
  }

  getBucketsForProject(projectId: string): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(`${this.apiUrl}/${projectId}/buckets`);
  }

  createTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Task>(this.taskApiUrl, task, { headers });
  }

  updateTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Task>(this.taskApiUrl, task, { headers });
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.taskApiUrl}/${taskId}`);
  }
}
