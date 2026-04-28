import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess } from './user.actions';


interface UserState{
    users:any[]
}

const initialState:UserState={
    users:[]
}


export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
);

