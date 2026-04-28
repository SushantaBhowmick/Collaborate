import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  selectedTask:any |null;
}

const inititalState: TaskState = {
  tasks: [],
  loading: false,
  selectedTask:null,
};

export const taskReducer = createReducer(
  inititalState,

  on(TaskActions.loadTask, (state) => ({
    ...state,
    loading: true,
  })),
  on(TaskActions.loadTaksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    tasks,
  })),

  // update only task status 
  on(TaskActions.updateTaskStatus, (state, { taskId, status }) => ({
    ...state,
    tasks: state.tasks.map((task) => (task._id === taskId ? { ...task, status } : task)),
  })),
  on(TaskActions.updateTaskStatusFailure, (state, { taskId, previousStatus }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task._id === taskId ? { ...task, status: previousStatus } : task,
    ),
  })),

  // exact task update
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks:state.tasks.map(t=>t._id===task._id?task: t)
  })),

  on(TaskActions.createTaskSuccess, (state, { task }) => ({
    ...state,
   tasks:[...state.tasks,task]
  })),
  on(TaskActions.selectTask,(state,{task})=>({
    ...state,
    selectedTask:task
  })),
  on(TaskActions.closeTask,(state)=>({
    ...state,
    selectedTask:null
  }))
);
