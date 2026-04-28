import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducers';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(selectTaskState, (state) => state.tasks);

export const selectTasksByStatus = (status: string) =>
  createSelector(selectTasks, (tasks) => tasks.filter((task) => task.status === status));


export const selectCurrentTask = createSelector(
  selectTaskState,
  (state)=>state.selectedTask
)