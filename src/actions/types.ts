import { Action } from "redux";
import { TemplateResult } from "lit-html";
import { SCREEN_SIZE } from "../types/screenSize";
import { Route } from "../types/routes";

// State for actions with a simple boolean state
export interface BooleanStateAction extends Action {
    state: boolean;
};

export interface ScreenSizeAction extends Action {
    size: SCREEN_SIZE
};

export interface RoutesAction extends Action {
    routes: Route[];
};

export interface PathAction extends Action {
    path: string
};

export interface UserAction extends Action {
    username?: String,
    password?: String
};
