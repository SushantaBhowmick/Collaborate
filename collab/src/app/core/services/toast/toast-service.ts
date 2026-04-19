import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  success(message: string) {
    toast.success(message);
  }
  error(message: string) {
    toast.error(message);
  }
  info(message: string) {
    toast.info(message);
  }
  loading(message: string) {
    return toast.loading(message);
  }
  dismiss(id?: string | number) {
    toast.dismiss(id);
  }
}
