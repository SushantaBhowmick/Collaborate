import { createAction, props } from '@ngrx/store';
import { ProjectType } from '../models/project.model';

export const loadProjects = createAction('[Project] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ projects: ProjectType[] }>(),
);

export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{ error: any }>(),
);

export const createProject = createAction(
  '[Project] Create Project',
  props<{ data: any }>(),
);
export const createProjectSuccess = createAction(
  '[Project] Create Project Success',
  props<{ project: ProjectType }>(),
);
export const createProjectFailure = createAction(
  '[Project] Create Project Failure',
  props<{ error: any }>(),
);
