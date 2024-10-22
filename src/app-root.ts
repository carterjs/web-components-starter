import { customElement, LitElement, html, property } from "lit-element";
import { installRouter } from "pwa-helpers/router";
import { connect } from "pwa-helpers/connect-mixin";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installMediaQueryWatcher } from "pwa-helpers/media-query";
import { store } from "./store";
import { setOffline, setScreenSize, setDrawerState, navigate, setRoutes } from "./actions/app";
import { AppState } from "./reducers/types";
import { SCREEN_SIZE } from "./types/screenSize";
import { renderRoute } from "./utils/renderRoute";

import "./components/app-header/app-header";
import "./components/app-footer/app-footer";

import style from "./app-root.scss";
import "./app.scss";

// Set routes
store.dispatch(setRoutes([
    {
        path: "/",
        render: () => {
            import(/* webpackChunkName: "main-pages" */"./pages/landing/landing-page");
            return html`<landing-page></landing-page>`;
        }
    },
    {
        path: "/team",
        render: () => {
            import(/* webpackChunkName: "main-pages" */"./pages/team/team-page");
            return html`<team-page></team-page>`;
        }
    },
    {
        path: "/mission",
        render: () => {
            import(/* webpackChunkName: "main-pages" */"./pages/mission/mission-page");
            return html`<mission-page></mission-page>`;
        }
    },
    {
        path: "/values",
        render: () => {
            import(/* webpackChunkName: "main-pages" */"./pages/values/values-page");
            return html`<values-page></values-page>`;
        }
    },
    {
        path: "/signin",
        render: () => {
            import(/* webpackChunkName: "main-pages" */"./pages/auth/sign-in/sign-in-page");
            return html`<sign-in-page></sign-in-page>`;
        }
    },
    {
        path: "/register",
        render: () => {
            import(/* webpackChunkName: "main-pages" */ "./pages/auth/register/register-page");
            return html`<register-page></register-page>`;
        }
    },
    {
        path: "/dashboard",
        render: () => {
            import(/* webpackChunkName: "user-pages" */ "./pages/user/dashboard/dashboard-page");
            return html`<dashboard-page></dashboard-page>`;
        }
    }
]));

// Watch for URL changes
installRouter(location => store.dispatch(navigate(location.pathname)));

// Watch network state
installOfflineWatcher(offline => {
    store.dispatch(setOffline(offline));
});

// Watch screen size
installMediaQueryWatcher(`(max-width: 599px)`, matches => {
    store.dispatch(setScreenSize(matches ? SCREEN_SIZE.SMALL : SCREEN_SIZE.LARGE));
});

@customElement("app-root")
export class AppRoot extends connect(store)(LitElement) {

    @property({type: String})
    path = "";

    @property({type: Boolean})
    offline = true;

    @property({type: SCREEN_SIZE})
    screenSize = SCREEN_SIZE.SMALL;

    @property({type: Boolean}) 
    drawerState = false;

    @property({type: Object})
    route: any = null;

    static get styles() {
        return style;
    }

    firstUpdated() {
        installRouter(location => this.path = location.pathname);
    }

    render() {
        return html`
            <app-header></app-header>
            <main>
                ${renderRoute(this.route)}
            </main>
            <app-footer></app-footer>
        `;
    }

    stateChanged(state: any) {
        const appState = state.app as AppState;
        this.offline = appState.offline;
        this.screenSize = appState.screenSize;
        this.drawerState = appState.drawer;
        this.route = appState.route;
    }
}