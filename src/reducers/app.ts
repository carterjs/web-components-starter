import { Action } from "redux";
import { BooleanStateAction, ScreenSizeAction, RoutesAction, PathAction } from "../actions/types";
import { SCREEN_SIZE } from "../types/screenSize";
import { AppState } from "./types";
import { SET_OFFLINE, SET_DRAWER_STATE, SET_SCREEN_SIZE, SET_ROUTES, NAVIGATE } from "../actions/app";
import { Route } from "../types/routes";

const initialState: AppState = {
    offline: false,
    drawer: false,
    screenSize: SCREEN_SIZE.SMALL,
    routes: [],
    route: null
};

export function app(state = initialState, action: Action): AppState {
    switch(action.type) {
        case SET_OFFLINE:
            const offline =  Object.assign({}, state, {
                offline: (action as BooleanStateAction).state
            });
            return offline;
            break;
        case SET_DRAWER_STATE:
            return Object.assign({}, state, {
                drawer: (action as BooleanStateAction).state
            });
            break;
        case SET_SCREEN_SIZE:
            return Object.assign({}, state, {
                screenSize: (action as ScreenSizeAction).size
            });
            break;
        case SET_ROUTES:
            return Object.assign({}, state, {
                routes: (action as RoutesAction).routes
            });
            break;
        case NAVIGATE:
            const path = (action as PathAction).path;
            let route: Route | null = null;
            for(var i=0; i < state.routes.length; i++) {
                if(path.match(state.routes[i].path)) {
                    route = state.routes[i];
                    // Assemble args from param list
                    const terms = path.slice(1).split('/');
                    if(terms.length > 0 && !!route.params) {
                        route.params!.forEach((param: { index: number; key: string | number; }) => {
                            if(param.index < terms.length) {
                                route!.args[param.key] = terms[param.index];
                            }
                        });
                    }
                }
            }
            if(!!route) {
                return Object.assign({}, state, {
                    route: {...route}
                });
            }
    }
    return state;
}