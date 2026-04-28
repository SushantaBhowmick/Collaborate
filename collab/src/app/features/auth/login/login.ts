import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/services/toast/toast-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb=inject(FormBuilder)
  private auth=inject(Auth)
  private router=inject(Router)
  private toast = inject(ToastService)


  form= this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  })

  constructor(){
    
  }
  loading=false
  error:string|null = null;


  
submit(){
  if(this.form.invalid) return ;
  this.loading = true
  console.log(this.form.value)

  this.auth.login(this.form.value).subscribe({
    next:(res)=>{
      this.loading=false;
      localStorage.setItem('token',res.token);
      this.toast.success(res.message || "Login successs")
      this.router.navigate(['/dashboard']);
    },
    error:(err)=>{
      this.loading = false;
      // this.toast.error(err.error.message|| "Login failed")
      this.error = err.error.mesage;
    }
  })
}

}
