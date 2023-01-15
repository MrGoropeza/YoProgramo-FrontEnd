import { createReducer, on } from '@ngrx/store';
import { Project } from 'src/app/project/models/Project.model';

import * as actions from './project.actions';

export const projectFeatureKey = 'project';

export interface ProjectState {
  projects: Project[];
  projectsLoading: boolean;
  projectsError: unknown;
}

export const initialState: ProjectState = {
  projects: [],
  projectsLoading: false,
  projectsError: undefined
};

export const reducer = createReducer(
  initialState,
  on(
    actions.loadProjects,
    (state): ProjectState => ({ ...state, projects: [], projectsLoading: true })
  ),
  on(
    actions.loadProjectsSuccess,
    (state, action): ProjectState => ({ ...state, projects: action.data, projectsLoading: false })
  ),
  on(
    actions.loadProjectsFailure,
    (state, action): ProjectState => ({ ...state, projectsError: action.error, projectsLoading: false })
  )
);
