import Swal from 'sweetalert2';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HelpModalComponent } from './help-modal/help-modal.component';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  public isInvalid = false;

  constructor(
    public matDialog: MatDialog,
    public fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public loginForm = this.fb.group({
    nome: ['', Validators.required],
    senha: ['', Validators.required],
  });

  public async login() {
    if (
      this.loginForm.controls['nome'].value === '' ||
      this.loginForm.controls['nome'].value === ''
    ) {
      this.isInvalid = true;
      return;
    }
    await this.authService.login(this.loginForm.value).then((res) => {
      console.log(res);
    });
  }

  redirect() {
    this.router.navigate(['/registrar']);
  }

  helpModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'help-modal-component';
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = false;
    dialogConfig.data = {};
    const config: any = {};
    dialogConfig.data = config;
    const dialogRef = this.matDialog.open(HelpModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }
}
