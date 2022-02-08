import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OneProjectComponent } from './pages/one-project/one-project.component';
import { AuthGuard } from './guards/auth.guard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import { NoteCardComponent } from './pages/one-project/note-card/note-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, AuthLoginComponent, OneProjectComponent, NoteCardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule
  ],
  providers: [AuthServiceService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
}
