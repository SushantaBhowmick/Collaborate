import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectState } from "./project.reducer";



export const selectProjectState = 
createFeatureSelector<ProjectState>('projects');

export const selectProjects = createSelector(selectProjectState,(state)=>state.projects)
export const selectLoading = createSelector(selectProjectState,(state)=>state.loading)

