import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;

  constructor(private service: SpinnerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.service.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === ('start');
      this.cdRef.detectChanges();
    })
  }
}
