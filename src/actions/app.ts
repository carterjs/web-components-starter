import { BooleanStateAction, SCREEN_SIZE, ScreenSizeAction, Route } from "./types";

// Set network state (online = true)
export const SET_OFFLINE = "SET_OFFLINE";
export function setOffline(state: boolean): BooleanStateAction {
    return {
        type: SET_OFFLINE,
        state
    };
}

// Set drawer state (open = true)
export const SET_DRAWER_STATE = "SET_DRAWER_STATE";
export function setDrawerState(state: boolean): BooleanStateAction {
    return {
        type: SET_DRAWER_STATE,
        state
    };
}

// Set screen size
export const SET_SCREEN_SIZE = "SET_SCREEN_SIZE";
export function setScreenSize(size: SCREEN_SIZE): ScreenSizeAction {
    return {
        type: SET_SCREEN_SIZE,
        size
    };
};

// Store potential routes
export const SET_ROUTES = "SET_ROUTES";
export function setRoutes(_routes: Route[]) {
    let routes: Route[] = [];
    // Validate routes
    _routes.forEach(route => {
        if(typeof route.path == "string") {
            // Remove trailing slash
            if(route.path.length > 1 && route.path.slice(-1) == "/") {
                route.path = route.path.slice(0,-1);
            }
            // Determine path type
            if(route.path.match(/^\/([a-zA-Z0-9]\/?)*$/)) {
                // Valid path without params
                route.path = new RegExp(`^${route.path}\/?$`);
                routes.push(route);
            } else if(route.path.match(/^\/((\{[a-zA-Z]+\}|[a-zA-Z0-9])\/?)*$/)) {
                // Path with params
                const terms = route.path.slice(1).split('/');
                var pathString = "";
                route.params = [];
                route.args = {};
                terms.forEach((term, index) => {
                   if(term.match(/\{[a-zA-Z]+\}/)) {
                        // Route param
                        route.params!.push({
                            key: term.slice(1, -1),
                            index
                        });
                        pathString += "/[^\/.]+";
                   } else {
                       // Not a route param
                       pathString += "/" + term;
                   }
                });
                // Assemble regex with clean path
                route.path = new RegExp(`^${pathString}\/?$`);
                routes.push(route);
            } else {
                console.error("\"" + route.path + "\" is not a properly formatted path.");
                return;
            }
        }
    });
    return {
        type: SET_ROUTES,
        routes
    };
}

export const NAVIGATE = "NAVIGATE";
export function navigate(path: string) {
    console.log(path);
    return {
        type: NAVIGATE,
        path
    };
}