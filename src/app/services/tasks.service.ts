import { IFinishModel } from './../models/finish.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppContstants } from './../app-contstants';
import { tasksModel } from '../models/tasks.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public save(token: any, data: tasksModel) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post(AppContstants.save, data, httpOptions);
  }

  public getTasks(token: any): Observable<tasksModel[]> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<tasksModel[]>(AppContstants.getTasks, httpOptions);
  }

  public getTasksId(token: any, id: number) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<any>(AppContstants.getTasks + `/${id}`, httpOptions);
  }

  public search(token: any) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };

    let params = new HttpParams();


    return this.http.get(AppContstants.search, httpOptions )
  }

  public delete(token: any, id: number) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.delete(`https://one-project.azurewebsites.net/excluir/${id}`, httpOptions);
  }

  public finishTask(token: any, id: number, data: IFinishModel) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };

    return this.http.put(`https://one-project.azurewebsites.net/${id}/concluir`, data, httpOptions);
  }
}
