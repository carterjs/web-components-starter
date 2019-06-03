import { TemplateResult, html } from "lit-html";
import { Route } from "../types/routes";

export function renderRoute(route: Route): TemplateResult {
    if(!!route) {
        return route.render(route);
    }
    return html``;
};