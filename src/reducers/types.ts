import { SCREEN_SIZE, Route } from "../actions/types";

export interface AppState {
    offline: boolean,
    drawer: boolean,
    screenSize: SCREEN_SIZE,
    routes: Route[],
    route: Route | null
};