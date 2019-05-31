import { customElement, LitElement, html, property, TemplateResult } from "lit-element";
import {installRouter} from 'pwa-helpers/router';
import {Router} from './utils/router';

// Create the router, define routes
const router = new Router([
    {
        path: "/mission",
        render: (route) => {
            import(/* webpackChunkName: "mission-page" */"./pages/mission/mission-page");
            return html`<mission-page></mission-page>`;
        }
    },
    {
        path: "/",
        render: () => {
            import(/* webpackChunkName: "landing-page" */"./pages/landing/landing-page");
            return html`<landing-page></landing-page>`;
        }
    }
]);

@customElement("app-root")
export class AppRoot extends LitElement {

    @property({type: String})
    path = "";

    firstUpdated() {
        installRouter(location => this.path = location.pathname);
    }

    render() {
        return html`
            <h1>Web Components Starter</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/mission">Mission</a></li>
            </ul>
            <hr>
            ${router.getPage(this.path)}
        `;
    }
}