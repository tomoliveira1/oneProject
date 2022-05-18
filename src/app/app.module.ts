import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import { NoteCardComponent } from './pages/tasks/note-card/note-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { AuthGuard } from './guards/auth.guard';
import { httpInterceptProviders } from './http-interceptors';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { HttpErrorService } from './services/http-error.service';
import { TasksComponent } from './pages/tasks/tasks.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './layout/main/main.component';
import { AddModalComponent } from './components/add-modal/add-modal.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthRegisterComponent } from './pages/auth-register/auth-register.component';
import {MatSelectModule} from '@angular/material/select';
import { HelpModalComponent } from './pages/auth-login/help-modal/help-modal.component';
@NgModule({
  declarations: [AppComponent, AuthLoginComponent, NoteCardComponent, SpinnerComponent, TasksComponent, NavbarComponent, SidebarComponent, MainComponent, AddModalComponent, AuthRegisterComponent, HelpModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule,
    MatSelectModule
  ],
  exports: [
    MatDatepickerModule,
     MatNativeDateModule
  ],
  providers: [AuthServiceService, AuthGuard, httpInterceptProviders, HttpErrorService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
