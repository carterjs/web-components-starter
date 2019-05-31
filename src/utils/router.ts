import { TemplateResult, html } from "lit-html";

interface Route {
    path: string | RegExp,
    params?: {
        key: string,
        index: number
    }[],
    args?: any,
    render(route: Route): TemplateResult
}

export class Router {

    routes: Route[];
    base: string;
    route: Route | undefined;
    location: Location | undefined;

    constructor(routes: Route[], base: string = "/") {
        this.base = base;
        this.routes = [];
        // Validate routes
        routes.forEach(route => {
            if(typeof route.path == "string") {
                // Remove trailing slash
                if(route.path.length > 1 && route.path.slice(-1) == "/") {
                    route.path = route.path.slice(0,-1);
                }
                // Determine path type
                if(route.path.match(/^\/([a-zA-Z0-9]\/?)*$/)) {
                    // Valid path without params
                    route.path = new RegExp(`^${route.path}\/?$`);
                    this.routes.push(route);
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
                    this.routes.push(route);
                } else {
                    console.error("\"" + route.path + "\" is not a properly formatted path.");
                    return;
                }
            }
        });
    }

    getPage(path: String): TemplateResult {
        for(var i=0; i < this.routes.length; i++) {
            if(path.match(this.routes[i].path)) {
                this.route = this.routes[i];
                // Assemble args from param list
                const terms = path.slice(1).split('/');
                if(terms.length > 0 && !!this.route.params) {
                    this.route.params!.forEach(param => {
                        if(param.index < terms.length) {
                            this.route!.args[param.key] = terms[param.index];
                        }
                    });
                }
                return this.route.render(this.route);
            }
        }
        this.route = undefined;
        return html`500 error`;
    }
}