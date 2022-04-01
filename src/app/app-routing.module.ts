import { TasksComponent } from './pages/tasks/tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from 'src/app/pages/auth-login/auth-login.component'
import { AuthGuard } from './guards/auth.guard';
import { NoteCardComponent } from './pages/tasks/note-card/note-card.component';
import { MainComponent } from './layout/main/main.component';
import { AuthRegisterComponent } from './pages/auth-register/auth-register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthLoginComponent},
  { path: 'registrar', component: AuthRegisterComponent},
  {
    path: 'tasks',
    component: MainComponent,
    children: [
      { path: 'notes', component: TasksComponent},
      { path: 'completes', component: TasksComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
