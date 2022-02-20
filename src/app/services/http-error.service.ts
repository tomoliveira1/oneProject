import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() {
   }

   showError(errors: any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      icon: 'error',
      text: errors.error.message,
    });
   }
}
