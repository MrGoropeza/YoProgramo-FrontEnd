import { createAction, props } from "@ngrx/store";

export const loadInicios = createAction(
	"[Inicio] Load Inicios"
);

export const loadIniciosSuccess = createAction(
	"[Inicio] Load Inicios Success",
	props<{ data: any }>()
);

export const loadIniciosFailure = createAction(
	"[Inicio] Load Inicios Failure",
	props<{ error: any }>()
);
