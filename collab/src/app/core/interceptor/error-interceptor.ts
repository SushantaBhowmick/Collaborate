import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast/toast-service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService)

  return next(req).pipe(catchError((err)=>{
    console.log('Api Error:',err)
    if(err?.status===401){
      // window.location.reload();
       toast.error('Session expired. Please login again');
      localStorage.removeItem('token')
      // window.location.href='/login';
    }
    toast.error(err?.error?.message)
    return throwError(()=>err)
  }))
  // return next(req);
};
