import { createFeatureSelector, createSelector } from "@ngrx/store";


export const selectUsers = createSelector(
    createFeatureSelector<any>('users'),
    (state)=>state.users,
)