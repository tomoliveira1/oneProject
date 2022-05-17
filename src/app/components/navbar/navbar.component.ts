import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public spinner: SpinnerService, public router: Router) { }
  public user = localStorage.getItem("user") as string;

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/login']).then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    })
  }

}
