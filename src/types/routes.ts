import { TemplateResult } from "lit-html";

// Route for the router pages
export interface Route {
    path: string | RegExp,
    params?: {
        key: string,
        index: number
    }[],
    args?: any,
    render(route: Route): TemplateResult
}