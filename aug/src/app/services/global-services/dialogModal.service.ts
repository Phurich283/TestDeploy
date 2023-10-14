import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export default class DialogModalService {
  openCompleteModal(
    title: string,
    message: string,
    textBtn: string,
    callback?: Function
  ) {
    Swal.fire({
      icon: 'success',
      title: title,
      html: message,
      showConfirmButton: true,
      confirmButtonColor: '#005FBC',
      confirmButtonText: textBtn,
      customClass: {
        title: 'text-dark',
        popup: 'swal-wide',
        htmlContainer: 'htmlContainer',
        confirmButton: 'sweet_confirmbuttonImportant',
      },
    })
      .then(() => (callback ? callback() : () => {}))
      .catch((e) => console.error(e.message));
  }

  openUnsuccessfulModal(title: string, message: string, callback?: Function) {
    Swal.fire({
      icon: 'error',
      title: title,
      html: message,
      showConfirmButton: true,
      confirmButtonColor: '#005FBC',
      confirmButtonText: 'ตกลง',
      customClass: {
        title: 'text-dark',
        popup: 'swal-wide',
        htmlContainer: 'htmlContainer',
        confirmButton: 'sweet_confirmbuttonImportant',
      },
    })
      .then(() => (callback ? callback() : () => {}))
      .catch((e) => console.error(e.message));
  }
}
