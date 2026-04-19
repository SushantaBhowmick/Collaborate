import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/services/toast/toast-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {


  private fb=inject(FormBuilder)
  private auth=inject(Auth)
  private router=inject(Router)
  private toast = inject(ToastService)


  form= this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    orgName:['',[Validators.required]]
  })

  constructor(){
    
  }
  loading=false
  error:string|null = null;


  
submit(){
  if(this.form.invalid) return ;
  this.loading = true
  console.log(this.form.value)

  this.auth.register(this.form.value).subscribe({
    next:(res)=>{
      this.loading=false;
      localStorage.setItem('token',res.token);
      this.toast.success(res.data.message || "User created successfully")
      console.log(res)
      this.router.navigate(['/dashboard']);
    },
    error:(err)=>{
      this.loading = false;
      this.toast.error(err.error.message|| "register failed")
      this.error = err.error.mesage;
    }
  })
}

}
