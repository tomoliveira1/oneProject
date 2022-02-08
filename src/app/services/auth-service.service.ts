import { AppContstants } from './../app-contstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public userAuthenticated = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }



  public authUser() {
    return this.userAuthenticated;
  }

  async login(usuario = {}) {
    return this.http.post(AppContstants.loginBase, usuario).subscribe(data => {
      var token = JSON.parse(JSON.stringify(data)).token

      localStorage.setItem("token", token)

      this.router.navigate(['/projetos'])
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        icon: 'success',
        text: 'Login realizado com sucesso!',
      });
      // this.userAuthenticated = true;
    })
  }

  async signIn(usuario = {}) {
    return this.http.post(AppContstants.signinBase, usuario).subscribe(data => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        icon: 'success',
        text: 'Registro realizado com sucesso!',
      })

      this.router.navigate(['/projetos'])
    });
  }

}
