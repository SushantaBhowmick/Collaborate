import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InviteService } from '../../services/invite-service';
import { ToastService } from '../../../../core/services/toast/toast-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accept-invite',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './accept-invite.html',
  styleUrl: './accept-invite.css',
})
export class AcceptInvite {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private inviteService = inject(InviteService)
  private toast = inject(ToastService);

  token= this.route.snapshot.params['token'];

  form = this.fb.group({
    name:['',Validators.required],
    password:['',Validators.required]
  });

  submit(){
    if(this.form.invalid) return;
    this.inviteService.acceptInvite(this.token,this.form.value)
    .subscribe({
      next:(res)=>{
        this.toast.success(res?.data?.message || 'Account Created')
        this.router.navigate(['/login'])
      },
      // error:()=>this.toast.error("Invite failed")
    })
  }
}
