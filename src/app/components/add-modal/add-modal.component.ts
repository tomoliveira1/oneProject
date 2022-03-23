import { SpinnerService } from './../../services/spinner.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit, AfterViewInit {

  constructor(
  private service: TasksService,
  public fb: FormBuilder,
  public matDialog: MatDialog,
  public spinner: SpinnerService,
  public dialogRef: MatDialogRef<AddModalComponent>
  ) { }

  public form = this.fb.group({
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    data: ['', Validators.required],
    hora: ['', Validators.required],
    cor: ['#0000000']
  })

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.form.controls["cor"].setValue('#000000')
  }

  onBack(): void {
    this.dialogRef.close();
  }

  setColor(e: any) {
    this.form.controls["cor"].setValue(e?.target?.value)
  }

  colorPicker():void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'color-picker';
    dialogConfig.width = '250px';
    dialogConfig.height = '10%';
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = 'scape';
    dialogConfig.disableClose = false;
    dialogConfig.data = {};

    const dialogRef = this.matDialog.open(ColorPickerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  public salvar() {
    if(this.form.valid) {
      this.service.save(localStorage.getItem("token"), this.form.value).subscribe((data: any) => {
        if(data.message === "Tarefa Cadastrada com Sucesso") {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            icon: 'success',
            text: data.message,
          });
          this.dialogRef.close();
        }
      })
  
      this.spinner.requestEnded();
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        icon: 'warning',
        text: "Preencha todos os campos!"
      });
    }
  }

  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/',/\d/, /\d/,/\d/, /\d/]
  };
}
