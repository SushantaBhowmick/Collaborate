import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentTask, selectTasksByStatus } from '../../state/task.selectors';
import * as TaskAction from '../../state/task.actions';
import { CdkDragDrop, CdkDrag, CdkDropList,DragDropModule } from '@angular/cdk/drag-drop';
import { statusType } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskModal } from '../../components/task-modal/task-modal';
import { ActivatedRoute } from '@angular/router';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskDrawer } from "../../components/task-drawer/task-drawer";

@Component({
  selector: 'app-task-board',
  imports: [CommonModule, CdkDrag, CdkDropList, TaskModal, DragDropModule, TaskCard, TaskDrawer],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard implements OnInit {
  private store = inject(Store);
  private activateRoute = inject(ActivatedRoute);

  
  showModal = false;
  selectedProjectId: any;
  
  todo$ = this.store.select(selectTasksByStatus('TODO'));
  inprogress$ = this.store.select(selectTasksByStatus('IN_PROGRESS'));
  done$ = this.store.select(selectTasksByStatus('DONE'));

  listIds = ['todoList', 'inProgressList', 'doneList'];
  
  statusCol = [
    { label: 'Todo', key: 'TODO', data: this.todo$ },
    { label: 'In Progress', key: 'IN_PROGRESS', data: this.inprogress$ },
    { label: 'Done', key: 'DONE', data: this.done$ }
  ]
  selectedTask$ = this.store.select(selectCurrentTask);

  projectId: any;

  ngOnInit(): void {
    this.selectedProjectId = this.activateRoute.snapshot.paramMap.get('id');
    if(this.selectedProjectId){
      this.store.dispatch(TaskAction.loadTask({ projectId: this.selectedProjectId }));
    }
  }
  

  openModal() {
    this.showModal = true;
  }

  refresh(){
    this.store.dispatch(TaskAction.loadTask({projectId:this.selectedProjectId}))
  }
  closeModal() {
    this.showModal = false;
  }

  openTask(task:any){
    this.store.dispatch(TaskAction.selectTask({task}))
  }

  drop(event: CdkDragDrop<any[]>, newStatus: any) {
    if (event.previousContainer === event.container) return;
    console.log(event );
    const task = event.previousContainer.data[event.previousIndex];

    this.store.dispatch(
      TaskAction.updateTaskStatus({
        taskId: task._id,
        status: newStatus,
        previousStatus: task.status,
      }),
    );
  }
}
