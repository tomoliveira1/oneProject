import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  public samePass = false;

  constructor(
    public fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public registerForm = this.fb.group({
    nome: ['', Validators.required],
    senha: ['', Validators.required],
    confirmSenha: ['', Validators.required]
  })

  removeConfirmPassword(data: any) {
    this.registerForm.removeControl('confirmSenha')
  }

  public redirect() {
    this.router.navigate(['/login'])
  }

  public signIn() {
    if(this.registerForm.controls['senha'].value !== this.registerForm.controls['confirmSenha'].value) {
      this.samePass = true;
    } else {
      this.samePass = false;
      const form = {
        nome: this.registerForm.controls['nome'].value,
        senha: this.registerForm.controls['senha'].value
      }
      this.authService.signIn(form);
    }
  }
}
