import { Action } from "@ngrx/store";

export interface Command {
    name: string;
    desc: string;
    action: Action;
}
