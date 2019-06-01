import { Action } from "redux";
import { TemplateResult } from "lit-html";

// State for actions with a simple boolean state
export interface BooleanStateAction extends Action {
    state: boolean;
};

// Generic screen sizes for responsive features
export enum SCREEN_SIZE {
    SMALL,  // Phone + small tablet
    LARGE   // Computer
};

export interface ScreenSizeAction extends Action {
    size: SCREEN_SIZE
};

export interface Route {
    path: string | RegExp,
    params?: {
        key: string,
        index: number
    }[],
    args?: any,
    render(route: Route): TemplateResult
}

export interface RoutesAction extends Action {
    routes: Route[];
};

export interface PathAction extends Action {
    path: string
};