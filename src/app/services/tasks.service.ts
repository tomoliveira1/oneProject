import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppContstants } from './../app-contstants';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getTasks(token: any) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get(AppContstants.getTasks, httpOptions);
  }
}




