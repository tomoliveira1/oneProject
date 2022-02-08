import { Component, OnInit } from '@angular/core';
import { tasksModel } from 'src/app/models/tasks.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  public token = localStorage.getItem("token");
  public tasks: any;

  teste = [
    { nome: 'Teste 1', descricao: 'teste 1 descrição' },
    { nome: 'Teste 2', descricao: 'teste 2 descrição' },
  ];

  constructor( private service: TasksService ) {}

  ngOnInit(): void {
    this.service.getTasks(this.token).subscribe((res) => {
      this.tasks = res;
    })
  }
}

