import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((err)=>{
    // private ToastService
    console.log('Api Error:',err)

    return throwError(()=>err)
  }))
  return next(req);
};
