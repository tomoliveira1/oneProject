import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { elements } from './element';
import { dragEvents } from './dragEvents';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-drag-drog',
  templateUrl: './drag-drog.component.html',
  styleUrls: ['./drag-drog.component.scss']
})
export class DragDrogComponent implements OnInit, AfterViewInit {
  @Input() columnsDrops: string[] = ["To do", "In Progress", 'Done'];
  @Output() noDataFunction:EventEmitter<boolean> = new EventEmitter();

  public token = localStorage.getItem("token");
  public noData = false;
  public tasks: any;
  constructor( private service: TasksService, public spinner: SpinnerService ) {}

  ngOnInit(): void {
    this.service.getTasks(this.token).subscribe((res) => {
      this.tasks = res;
      if(this.tasks.length === 0) {
        this.noDataFunction.emit(true)
      }

      console.log(this.noData)
      main();
      this.spinner.requestEnded()

    })
  }

  getBright(hex: string) {
    return tinycolor(hex).isLight();
  }


  ngAfterViewInit(): void {
    window.addEventListener("load",() => main())

    main();
  }

}

function main() {
  const { dragStart, dragEnd, dragOver, dragExit, dragLeave } = dragEvents();
  const { cards, dropzones } = elements();

  cards().forEach(card => {
    card.addEventListener('dragstart', (e) =>  dragStart(e));
    card.addEventListener('dragend', (e) =>  dragEnd(e));
  })

  dropzones().forEach(element => {
    element.addEventListener("dragover", (e) => dragOver(e));
    element.addEventListener("dragleave", (e) =>  dragLeave(e));
    element.addEventListener("dragexit", (e) =>  dragExit());
  });
}
