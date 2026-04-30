import { Component, inject, OnInit, signal } from '@angular/core';
import { InviteService } from '../../services/invite-service';
import { CommonModule } from '@angular/common';
import { InviteForm } from "../invite-form/invite-form/invite-form";

@Component({
  selector: 'app-invite-list',
  imports: [CommonModule, InviteForm],
  templateUrl: './invite-list.html',
  styleUrl: './invite-list.css',
})
export class InviteList implements OnInit {

  private inviteService = inject(InviteService);
  invites=signal<any[]>([]);

  showInviteForm = false

  ngOnInit(): void {
    this.fetchInvitesUsers();
  }

    closeInviteForm(){
    this.showInviteForm=false;
    this.fetchInvitesUsers()
  }

  fetchInvitesUsers(){
    this.inviteService.getInvitesUserlist().subscribe({
      next:(res)=>{
        this.invites.set(res.data)
      }
    })
  }
}
