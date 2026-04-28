import { inject, Injectable } from '@angular/core';
import { Tasks } from '../../../core/services/tasks/tasks';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskAction from './task.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(Tasks);

  // only update the status
  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.updateTaskStatus),
      mergeMap(({ taskId, status, previousStatus }) =>
        this.taskService.UpdateTask(taskId, { status }).pipe(
          map(() => TaskAction.updateTaskStatusSuccess()),
          catchError(() =>
            of(
              TaskAction.updateTaskStatusFailure({
                taskId,
                previousStatus,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  // update exact task
    
  updateExactTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.updateTask),
      mergeMap(({ taskId, data }) =>
        this.taskService.UpdateExactTask(taskId, data).pipe(
          map((task) => TaskAction.updateTaskSuccess({task})),
          catchError((error) =>
            of(
              TaskAction.updateTaskFailure({error}),
            ),
          ),
        ),
      ),
    ),
  );


  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.loadTask),
      mergeMap(({ projectId }) =>
        this.taskService.getTAsks(projectId).pipe(
          map((res: any) => TaskAction.loadTaksSuccess({ tasks: res.data.tasks })),
          catchError((error) => of(TaskAction.loadTaksFailure({error}))),
        ),
      ),
    ),
  );
  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.createTask),
      mergeMap(({ data }) =>
        this.taskService.createTask(data).pipe(
          map((task: any) => TaskAction.createTaskSuccess({ task })),
          catchError((error) => of(
            TaskAction.createTaskFailure({error})
          )),
        ),
      ),
    ),
  );
}
