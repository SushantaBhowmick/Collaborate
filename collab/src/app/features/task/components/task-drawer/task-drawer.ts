import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentTask } from '../../state/task.selectors';
import * as TaskAction from '../../state/task.actions';
import { CommonModule } from '@angular/common';
import { CommentBox } from '../comment-box/comment-box';
import { ActivityTimeline } from '../activity-timeline/activity-timeline';
import { selectUsers } from '../../../user/state/user.selectors';
import { loadUsers } from '../../../user/state/user.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-drawer',
  imports: [CommonModule, CommentBox, ActivityTimeline],
  templateUrl: './task-drawer.html',
  styleUrl: './task-drawer.css',
})
export class TaskDrawer implements OnInit, OnChanges {
  private store = inject(Store);
  private activateRoute = inject(ActivatedRoute)
  selectedProjectId: any;
  task$ = this.store.select(selectCurrentTask);
  users$ = this.store.select(selectUsers);

  ngOnInit(): void {
    this.selectedProjectId = this.activateRoute.snapshot.paramMap.get('id');
    this.users$.subscribe((user) => {
      console.log({ user });
    });
    this.store.dispatch(loadUsers());
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  update(task: any, field: string, value: any) {
    if (field === 'assignedTo' && !value) {
      return;
    }
    this.store.dispatch(
      TaskAction.updateTask({
        taskId: task._id,
        data: { [field]: value },
      }),
    );
    // this.close();
    if (this.selectedProjectId) {
      setTimeout(() => {
      this.store.dispatch(TaskAction.loadTask({ projectId: this.selectedProjectId }));
      }, 2000);
    }
  }

  close() {
    this.store.dispatch(TaskAction.closeTask());
  }
}
