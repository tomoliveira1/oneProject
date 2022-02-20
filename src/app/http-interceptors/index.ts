
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthHeaderInterceptor } from "./auth-header-interceptor";
import { HttpErrorInterceptor } from "./http-error-interceptor";

export const httpInterceptProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
]
