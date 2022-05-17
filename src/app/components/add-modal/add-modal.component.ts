import { SpinnerService } from './../../services/spinner.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit, AfterViewInit {
  public title: string;

  public form = this.fb.group({
    id: [null],
    usuario: [''],
    nome: ['', Validators.required],
    descricao: ['', Validators.required],
    data: ['', Validators.required],
    hora: ['', Validators.required],
    cor: ['#FBE364']
  })

  @ViewChild('paint') button: ElementRef<HTMLButtonElement>;
  constructor(
  private service: TasksService,
  public fb: FormBuilder,
  public matDialog: MatDialog,
  public spinner: SpinnerService,
  public dialogRef: MatDialogRef<AddModalComponent>,
  public renderer: Renderer2,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data) {
      this.title = data?.title;
      this.form.controls['usuario'].setValue(data?.data?.usuario)
      this.form.controls['id'].setValue(data?.data?.id)
      this.form.controls['nome'].setValue(data?.data?.nome);
      this.form.controls['descricao'].setValue(data?.data?.descricao);
      this.form.controls['data'].setValue(data?.data?.data);
      this.form.controls['hora'].setValue(data?.data?.hora);
      this.form.controls['cor'].setValue(data?.data?.cor);
    }
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
   this.form.controls['cor'].value !== '#FBE364' ? this.renderer.setStyle(this.button.nativeElement, 'background', this.form.get('cor')?.value) : this.renderer.setStyle(this.button.nativeElement, 'background', '#FBE364')
  }

  onBack(): void {
    this.dialogRef.close();
  }

  setColor(e: any) {
    this.form.controls["cor"].setValue(e?.target?.value);
    if(!e) {
      this.form.controls["cor"].setValue('#FBE364');
    }
    this.renderer.setStyle(this.button.nativeElement, 'background', e?.target?.value)
  }

  public salvar() {
    if(this.form.valid) {
      this.service.save(localStorage.getItem("token"), this.form.value).subscribe((data: any) => {
        if(data.message === `${localStorage.getItem("user")} Tarefa Cadastrada com Sucesso`) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1200
          })
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
