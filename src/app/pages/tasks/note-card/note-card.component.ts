
import { Observable, BehaviorSubject } from 'rxjs';
import { IFinishModel } from './../../../models/finish.model';
import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef, Input  } from '@angular/core';
import { tasksModel } from 'src/app/models/tasks.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';
import * as tinycolor from 'tinycolor2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  public token = localStorage.getItem("token");
  public noData = false;
  @Input() public tasks: any;
  public isFinished: boolean = false;
  public array$ = new BehaviorSubject([]);

  constructor( private service: TasksService, public spinner: SpinnerService, private changeDetection: ChangeDetectorRef, private matDialog: MatDialog ) {}

  @Output() noDataFunction:EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    this.getTasksfunc()
  }

  getBright(hex: string) {
    return tinycolor(hex).isLight();
  }

  public getTasksfunc() {
    this.service.getTasks(this.token).subscribe((res) => {
      this.tasks = res;
      if(this.tasks.length === 0) {
        this.noDataFunction.emit(true)
      }
      this.spinner.requestEnded()
    })
    this.spinner.requestEnded()
  }

  public convertDigitIn(str: any){
    return str.split('-').reverse().join('/');
 }

  public editTask(id: number) {
    this.service.getTasksId(this.token, id).subscribe((res) => {
      if(res.id) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.id = 'add-modal-component';
          dialogConfig.width = '500px';
          dialogConfig.hasBackdrop = true;
          dialogConfig.disableClose = true;
          dialogConfig.data = {};
          const config: any = {
            data: res,
            title: "Editar Tarefa"
          }
          dialogConfig.data = config
          const dialogRef = this.matDialog.open(AddModalComponent, dialogConfig);

          dialogRef.afterClosed().subscribe(result => {
            if(result) {
              setTimeout(() => {
                this.getTasksfunc();
              }, 1000)
            }
            setTimeout(() => {
              this.getTasksfunc();
            }, 1000)
          })
          this.spinner.requestEnded()
      }
      this.spinner.requestEnded()
    })
  }

  public delete(id: number) {
    Swal.fire({
      title: 'Deletar Tarefa',
      text: 'Esta tarefa será deletada para sempre, deseja continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((res) => {
      if(res.value) {
        this.service.delete(this.token, id).subscribe((res) => {
          this.spinner.requestEnded();
          this.getTasksfunc();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarefa Excluida com sucesso!',
            showConfirmButton: false,
            timer: 1200
          })
        });
      }
    })
    this.spinner.requestEnded()
  }

  public finishTask(id: number) {
    var model = {
      concluida: true
    } as IFinishModel
    this.service.finishTask(this.token, id, model).subscribe((res) => {
      if(res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Eba, você concluiu uma tarefa!',
          showConfirmButton: false,
          timer: 1200
        })
        this.getTasksfunc();
        this.spinner.requestEnded()
      }
    })
    this.spinner.requestEnded()
  }
}

