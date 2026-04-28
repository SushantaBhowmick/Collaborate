import { createAction, props } from "@ngrx/store";
import { statusType, Task } from "../models/task.model";

export const loadTask = createAction(
    '[Task] Load Tasks',
    props<{projectId:string}>()
)

export const loadTaksSuccess = createAction(
    '[Task] Load Tasks Success',
    props<{tasks:Task[]}>()
)

export const loadTaksFailure = createAction(
    '[Task] Load Tasks Failure',
    props<{error:any}>()
)

export const createTask = createAction(
    '[Task] Create Task',
    props<{data:any}>()
)
export const createTaskSuccess = createAction(
    '[Task] Create Task Success',
    props<{task:Task}>()
)

export const createTaskFailure = createAction(
    '[Task] Create Task Failure',
    props<{error:any}>()
)


export const updateTaskStatus = createAction(
    '[Task] Update stauts',
    props<{taskId:string; status:statusType,previousStatus:statusType}>()
)

export const updateTaskStatusSuccess = createAction(
    '[Task] Update status Success',
)

export const updateTaskStatusFailure = createAction(
    '[Task] Update status Failure',
    props<{taskId:string; previousStatus:statusType}>()
)

export const selectTask = createAction(
    '[Task] Select Task',
    props<{task:any}>()
)


export const closeTask = createAction('[Task] Close Task')


export const updateTask = createAction(
    '[Task] Update Task',
    props<{taskId:string;data:any}>()
)

export const updateTaskSuccess = createAction(
    '[Task] Update Task Success',
    props<{task:any}>()
)

export const updateTaskFailure = createAction(
    '[Task] Update Task Failure',
    props<{error:any}>()
)