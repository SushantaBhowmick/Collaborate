import { Component, EventEmitter, HostListener, inject, Injectable, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InviteService } from '../../../services/invite-service';
import { ToastService } from '../../../../../core/services/toast/toast-service';
import { CommonModule } from '@angular/common';
import { RouterLinkActive } from "@angular/router";
import { CdkDropList } from "@angular/cdk/drag-drop";



@Component({
  selector: 'app-invite-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invite-form.html',
  styleUrl: './invite-form.css',
})  

export class InviteForm {
  private fb = inject(FormBuilder)
  private inviteService = inject(InviteService)
  private toast = inject(ToastService)

  @Output() close = new EventEmitter();

  form = this.fb.group({
    email:['',Validators.required, Validators.email],
    role:['']
  });

  @HostListener('document:keydown.escape')
  handleEsc(){
    this.onClose();
  }

  onClose(){
    this.close.emit();
  }

  submit(){
    if(this.form.invalid) return;

    this.inviteService.createInvite(this.form.value).subscribe({
      next:(res)=> {
        this.toast.success(res?.data?.message|| 'Invite Sent')
        this.close.emit()
      }
    })
  }
}
