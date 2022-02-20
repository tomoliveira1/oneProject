import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddModalComponent } from 'src/app/components/add-modal/add-modal.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(public matDialog: MatDialog, private service: TasksService, public spinner: SpinnerService) { }
  public noData = false;
  public token = localStorage.getItem("token");
  public tasks: any;

  ngOnInit(): void {
    this.getTasks();
  }

  addModal():void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'add-modal-component';
    dialogConfig.width = '500px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {};

    const dialogRef = this.matDialog.open(AddModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    })
  }

  noDataFunc(data: any) {
    this.noData = data;
  }

  getTasks() {
      this.service.getTasks(this.token).subscribe((res) => {
        if(res) {
          this.tasks = res;

          this.spinner.requestEnded();
        }
    })
  }


  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
