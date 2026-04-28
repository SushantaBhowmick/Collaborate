import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Project } from '../services/project';
import * as ProjectActions from './project.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProjectEffets {
  private actions$ = inject(Actions);
  private projectService = inject(Project);

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      mergeMap(() =>
        this.projectService.getProjects().pipe(
          map((res: any) => ProjectActions.loadProjectsSuccess({ projects: res.data })),
          catchError((error) => of(ProjectActions.loadProjectsFailure({ error }))),
        ),
      ),
    ),
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.createProject),
      mergeMap(({ data }) =>
        this.projectService.createProject(data).pipe(
          map((project) => ProjectActions.createProjectSuccess({ project })),
          catchError((error) => of(ProjectActions.createProjectFailure({ error }))),
        ),
      ),
    ),
  );
}
