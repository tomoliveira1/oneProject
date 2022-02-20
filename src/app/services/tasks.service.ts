import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppContstants } from './../app-contstants';
import { tasksModel } from '../models/tasks.model';

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

  public getTasks(token: any) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(AppContstants.getTasks, httpOptions);
  }

  public search(token: any) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };

    let params = new HttpParams();


    return this.http.get(AppContstants.search, httpOptions )
  }
}
