import { SCREEN_SIZE } from "../types/screenSize";
import { Route } from "../types/routes";

export interface AppState {
    offline: boolean,
    drawer: boolean,
    screenSize: SCREEN_SIZE,
    routes: Route[],
    route: Route | null
};

export interface UserState {
    username?: string,
    signedIn: boolean
};