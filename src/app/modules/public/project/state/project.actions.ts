import { createAction, props } from '@ngrx/store';
import { Project } from 'src/app/project/models/Project.model';

export const loadProjects = createAction(
  '[ProjectPage] Load Projects'
);

export const loadProjectsSuccess = createAction(
  '[ProjectPage] Load Projects Success',
  props<{ data: Project[] }>()
);

export const loadProjectsFailure = createAction(
  '[ProjectPage] Load Projects Failure',
  props<{ error: unknown }>()
);
