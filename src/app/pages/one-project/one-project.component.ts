import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-one-project',
  templateUrl: './one-project.component.html',
  styleUrls: ['./one-project.component.scss']
})

export class OneProjectComponent implements OnInit {
  public token = localStorage.getItem("token");

  constructor(
    private service: TasksService
  ) { }

  ngOnInit(): void {
  }



}
