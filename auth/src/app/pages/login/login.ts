import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  form;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
  ){
    this.form = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
    
  }


  submit(){
    if(this.form.invalid) return;
    this.auth.login(this.form.value).subscribe({
      next:()=>this.router.navigate(['/dashboard'])
    })
  }
}
