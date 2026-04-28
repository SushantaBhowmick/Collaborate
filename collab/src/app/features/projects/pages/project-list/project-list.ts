import { Component, inject, OnInit, signal } from '@angular/core';
import { Project } from '../../services/project';
import { ToastService } from '../../../../core/services/toast/toast-service';
import { ProjectForm } from "../../components/project-form/project-form";
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectLoading, selectProjects } from '../../state/project.selectors';
import * as ProjectActions from '../../state/project.actions';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-project-list',
  imports: [ProjectForm, CommonModule, RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {

  private projectService = inject(Project);
  private toast = inject(ToastService)
  private store = inject(Store)

  // projects=signal<any[]>([]);
  projects$ = this.store.select(selectProjects)
  loading$ = this.store.select(selectLoading)
  // loading=false;
  showForm = false

  ngOnInit(): void {
    this.fetchProjects();
  }
  closeDialog(){
    this.showForm=false;
  }
  
  fetchProjects(){
    console.log(this.loading$)
    console.log(this.projects$)
    this.store.dispatch(ProjectActions.loadProjects())
  }

  // fetchProjects(){
  //   this.loading= true;
  //   this.projectService.getProjects().subscribe({
  //     next:(res)=>{
  //       console.log(this.loading)
  //       this.projects.set(res.data);
  //       this.loading=false;
  //     },
  //     error:()=>{
  //       this.loading=false;
  //       this.toast.error("Failed to load projects")
  //     },
  //     complete:()=>{
  //       this.loading=false;
  //     }
  //   })
  // }

}
