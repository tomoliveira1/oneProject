import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { HttpErrorService } from "../services/http-error.service";
import { SpinnerService } from "../services/spinner.service";

@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private httpError: HttpErrorService, private spinner: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.requestStarted();

    return next.handle(req)
      .pipe(
        catchError( err => {
          let errMsg = '';
          console.log(err);

          this.httpError.showError(err)
          this.spinner.requestEnded()
          return throwError(() =>
            new Error('Aconteceu um erro inesperado!')
          )
        })
      )
  }

}
