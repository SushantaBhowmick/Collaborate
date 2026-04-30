import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../../user/state/user.selectors';
import { loadUsers } from '../../../user/state/user.actions';
import { Project } from '../../services/project';
import { ToastService } from '../../../../core/services/toast/toast-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-members',
  imports: [CommonModule,FormsModule],
  templateUrl: './project-members.html',
  styleUrl: './project-members.css',
})
export class ProjectMembers implements OnInit {

  @Input() projectId!:any;
  @Output() close = new EventEmitter();

  private http= inject(HttpClient);
  private store = inject(Store)
  private projectService = inject(Project)
  private toast = inject(ToastService)

  users$ = this.store.select(selectUsers)

  selectedUser = '';

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    console.log(this.projectId)
  }

  closeModal(){
    this.close.emit();
  }

  addMember(){
    if(!this.selectedUser) return ;

    this.projectService.addMember(this.projectId,this.selectedUser)
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.toast.success(res?.data?.message|| "Member added successfully!")
        this.closeModal();
      }
    })
  }

  
}
