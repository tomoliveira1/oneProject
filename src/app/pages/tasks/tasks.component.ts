import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges {

  constructor(public matDialog: MatDialog, private service: TasksService, public spinner: SpinnerService) { }
  public noData = false;
  public token = localStorage.getItem("token");
  public tasks: any;

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.tasks) {
      this.noData = true;
    }
  }

  addModal():void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'add-modal-component';
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {};
    const config: any = {
      title: "Nova Tarefa"
    }
    dialogConfig.data = config

    const dialogRef = this.matDialog.open(AddModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        setTimeout(() => {
          this.getTasks()
        }, 1000)
      }
      setTimeout(() => {
        this.getTasks()
      }, 1000)
    })
  }

  noDataFunc(data: any) {
    this.noData = data;
  }

  getTasks() {
      this.service.getTasks(this.token).subscribe((res) => {
        if(res) {
          this.tasks = res;
          this.noData = false;
          this.spinner.requestEnded();
        }
    })
  }
}
