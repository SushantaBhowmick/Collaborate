

import { inject, Injectable } from '@angular/core';
import { Tasks } from '../../../core/services/tasks/tasks';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAction from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersServices } from '../../../core/services/users/users-services';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UsersServices);

 
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((res: any) => UserAction.loadUsersSuccess({ users: res.data })),
        //   catchError((error) => of(TaskAction.loadTaksFailure({error}))),
        ),
      ),
    ),
  );
 
}
