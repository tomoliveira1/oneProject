import  Swal  from 'sweetalert2';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  public isSignIn = false;

  constructor(
    public fb: FormBuilder,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
  }

  public loginForm = this.fb.group({
    nome: ['', Validators.required],
    senha: ['', Validators.required],
  })

  public async login() {
    await this.authService.login(this.loginForm.value);
  }

  public async signIn() {
    this.authService.signIn(this.loginForm.value);
  }
}
