import { Action } from "@ngrx/store";

export interface CommandModel {
    name: string;
    desc: string;
    action: Action;
}
