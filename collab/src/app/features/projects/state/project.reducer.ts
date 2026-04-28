import { createReducer, on } from "@ngrx/store";
import { ProjectType } from "../models/project.model";
import * as ProjectAction from './project.actions'


export interface ProjectState{
    projects:ProjectType[],
    loading:boolean;
    error:any;
};

export const intialState:ProjectState={
    projects:[],
    loading:false,
    error:null
}


export const projectReducer = createReducer(
    intialState,

    on(ProjectAction.loadProjects,(state)=>({
        ...state,
        loading:true,
    })),
    
    on(ProjectAction.loadProjectsSuccess,(state,{projects})=>({
        ...state,
        loading:false,
        projects,
    })),
    on(ProjectAction.loadProjectsFailure,(state,{error})=>({
        ...state,
        loading:false,
        error,
    })),
    on(ProjectAction.createProjectSuccess,(state,{project})=>({
        ...state,
        projects:[...state.projects,project]
    })),
    on(ProjectAction.createProjectFailure,(state,{error})=>({
        ...state,
        loading:false,
        error,
    })),

)