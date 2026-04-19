import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../services/project';
import { ToastService } from '../../../../core/services/toast/toast-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm {
  private fb = inject(FormBuilder);
  private projectService = inject(Project)
  private toast = inject(ToastService)

  @Output() created = new EventEmitter();
  @Output() close = new EventEmitter();
  
  @HostListener('document:keydown.escape')
  handleEsc(){
    this.onClose();
  }

  form = this.fb.group({
    name:['',Validators.required],
    description:['']
  })

  loading=false;

  submit(){
    if(this.form.invalid) return;
    this.loading=true;

    this.projectService.createProject(this.form.value).subscribe({
      next:(res:any)=>{
        this.toast.success(res?.message||"Project created")
        this.loading=false;
        this.created.emit();
        this.form.reset();
        this.onClose();
      },
      error:()=>{
        this.toast.error("Failed to create project");
        this.loading = false;
      }
    })
  }

  onClose(){
    this.close.emit();
  }

}
