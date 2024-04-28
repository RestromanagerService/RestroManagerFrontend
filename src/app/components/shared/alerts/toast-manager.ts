import Swal from "sweetalert2";
const Toast = Swal.mixin({
    toast: true,
    animation: false,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });
export class ToastManager {
    static showToastInfo(title:string) {
        Toast.fire({
          icon: 'info',
          title: title
        });
    }
    static showToastError(title:string) {
        Toast.fire({
          icon: 'error',
          title: title
        });
    }
    static showToastWarning(title:string) {
        Toast.fire({
          icon: 'warning',
          title: title
        });
    }
    static showToastSuccess(title:string) {
        Toast.fire({
          icon: 'success',
          title: title
        });
    }
}
