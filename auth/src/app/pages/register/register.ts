import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ɵInternalFormsSharedModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form;
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router:Router,
  ){
    this.form = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      name:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  };

  submit(){
    if(this.form.invalid) return;
    this.auth.register(this.form.value).subscribe({
      next:()=>this.router.navigate(['/login']),
      error:(err)=>alert(err.error.message)
    })
  }
}
