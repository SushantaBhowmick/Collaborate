import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../services/project';
import { ToastService } from '../../../../core/services/toast/toast-service';
import { ProjectForm } from "../../components/project-form/project-form";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  imports: [ProjectForm, CommonModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {

  private projectService = inject(Project);
  private toast = inject(ToastService)

  projects:any[]=[];
  loading=false;
  showForm = false

  ngOnInit(): void {
    this.fetchProjects();
    console.log(this.loading)
  }
  closeDialog(){
    this.showForm=false;
  }

  fetchProjects(){
    this.loading= true;
    this.projectService.getProjects().subscribe({
      next:(res)=>{
        console.log(this.loading)
        this.projects=res.data;
      },
      error:()=>{
        this.toast.error("Failed to load projects")
      },
      complete:()=>{
        this.loading=false;
      }
    })
  }

}
