import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tasksModel } from 'src/app/models/tasks.model';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  public token = localStorage.getItem("token");
  public noData = false;
  public tasks: any;
  constructor( private service: TasksService, public spinner: SpinnerService ) {}

  @Output() noDataFunction:EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    this.service.getTasks(this.token).subscribe((res) => {
      this.tasks = res;
      if(this.tasks.length === 0) {
        this.noDataFunction.emit(true)
      }

      console.log(this.noData)
      this.spinner.requestEnded()
    })
  }

  getBright(hex: string) {
    return tinycolor(hex).isLight();
  }
}

