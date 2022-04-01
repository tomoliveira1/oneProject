import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public clicked = false;

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const path = this.route.snapshot.url.pop()?.toString();

    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
       })

    if (path?.includes('/tasks/notes')) {
      this.clicked = true;
    }
  }

}
