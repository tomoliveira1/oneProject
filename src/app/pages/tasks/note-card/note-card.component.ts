import { Observable, BehaviorSubject } from 'rxjs';
import { IFinishModel } from './../../../models/finish.model';
import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef, Input  } from '@angular/core';
import { tasksModel } from 'src/app/models/tasks.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';
import Swal from 'sweetalert2';
import * as tinycolor from 'tinycolor2';

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

  constructor( private service: TasksService, public spinner: SpinnerService, private changeDetection: ChangeDetectorRef ) {}

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
            toast: true,
            position: 'top-end',
            icon: 'success',
            text: 'Tarefa Excluida com sucesso!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
          });
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
          toast: true,
          position: 'top-end',
          icon: 'success',
          text: 'Eba, você concluiu uma tarefa!',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
        });
        this.getTasksfunc();
        this.spinner.requestEnded()
      }
    })
    this.spinner.requestEnded()
  }
}

