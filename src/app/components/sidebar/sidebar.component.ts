import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

    if (path?.includes('/tasks/notes')) {
      this.clicked = true;
    }
  }

}
