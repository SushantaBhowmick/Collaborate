import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../state/task.actions';
import { CommonModule } from '@angular/common';
import { selectUsers } from '../../../user/state/user.selectors';
import { loadUsers } from '../../../user/state/user.actions';

@Component({
  selector: 'app-task-modal',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css',
})
export class TaskModal implements OnInit{
  private fb = inject(FormBuilder)
  private store = inject(Store)

  @Output() close = new EventEmitter();
  @Input() projectId!:string;

  users$ = this.store.select(selectUsers)

  form = this.fb.group({
    title:['',Validators.required],
    description: [''],
    priority:['MEDIUM'],
    dueDate:[''],
    assignedTo:['']
  });

  // projectId!:string;

  ngOnInit(): void {
    this.store.dispatch(loadUsers())
  }

  submit(){
    console.log("called")
    // if(this.form.invalid) {
    //   console.log(this.form)
    //   return
    // }; 
const raw = this.form.value
    const payload:any = {
      title:raw.title,
      description:raw.description,
      priority:raw.priority,
      dueDate:raw.dueDate,
      projectId:this.projectId
    }

    if(raw.assignedTo){
      payload.assignedTo = raw.assignedTo
    }

    this.store.dispatch(
      TaskActions.createTask({
        data:payload
      })
    );

    this.close.emit();
    this.store.dispatch(TaskActions.loadTask({projectId:this.projectId}))
  }
}
