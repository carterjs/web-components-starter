import { Route } from "../actions/types";
import { TemplateResult, html } from "lit-html";

export function renderRoute(route: Route): TemplateResult {
    console.log(route);
    if(!!route) {
        return route.render(route);
    }
    return html``;
};