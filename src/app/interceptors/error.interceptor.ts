import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      //Handle HTTP errors
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            showErrorMsg('You are not authorized to view this page');
            break;
          case 403 || 429:
            showErrorMsg('It seems we have reached the limit of access to GitHub API. Please try again later.');
            break;
          case 404:
            showErrorMsg('Page not found');
            break;
          case 500:
            showErrorMsg('Internal server error');
            break;
          default:
            showErrorMsg("Something went wrong!");
        }
      }
      return throwError(() => error);
    })
  );
};

export function showErrorMsg(text: string) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
}
