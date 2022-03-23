import { AppContstants } from './../app-contstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public userAuthenticated = false;

  constructor(
    public spinner: SpinnerService,
    private http: HttpClient,
    private router: Router
  ) { }



  public authUser() {
    return this.userAuthenticated;
  }

  async login(usuario = {}) {
    return this.http.post(AppContstants.loginBase, usuario).subscribe(data => {
      this.router.navigate(['/tasks/notes'])
      try {
        var token = JSON.parse(JSON.stringify(data)).token
        localStorage.setItem("token", token);
        this.spinner.requestEnded();
        return true
      } catch(e) {
        this.spinner.requestEnded();
        return false
      }
    })
  }

  async signIn(usuario = {}) {
    return this.http.post(AppContstants.signinBase, usuario).subscribe(data => {
      var token = JSON.parse(JSON.stringify(data)).token
      localStorage.setItem("token", token);
      this.spinner.requestEnded();
      this.router.navigate(['/login'])
    });
  }
}
