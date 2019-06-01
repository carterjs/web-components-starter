import { customElement, LitElement, html, property } from "lit-element";
import { installRouter } from "pwa-helpers/router";
import { connect } from "pwa-helpers/connect-mixin";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installMediaQueryWatcher } from "pwa-helpers/media-query";
import { store } from "./store";
import { setOffline, setScreenSize, setDrawerState, navigate, setRoutes } from "./actions/app";
import { AppState } from "./reducers/types";
import { SCREEN_SIZE } from "./actions/types";
import { renderRoute } from "./utils/renderRoute";

import "@material/mwc-button/mwc-button";
import "@material/drawer";

import {MDCList} from "@material/list";
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

import "./app.scss";

// Set routes
store.dispatch(setRoutes([
    {
        path: "/",
        render: () => {
            import(/* webpackChunkName: "landing-page" */"./pages/landing/landing-page");
            return html`<landing-page></landing-page>`;
        }
    },
    {
        path: "/team",
        render: (route) => {
            import(/* webpackChunkName: "team-page" */"./pages/team/team-page");
            return html`<team-page></team-page>`;
        }
    },
    {
        path: "/mission",
        render: (route) => {
            import(/* webpackChunkName: "mission-page" */"./pages/mission/mission-page");
            return html`<mission-page></mission-page>`;
        }
    },
    {
        path: "/values",
        render: (route) => {
            import(/* webpackChunkName: "values-page" */"./pages/values/values-page");
            return html`<values-page></values-page>`;
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

    firstUpdated() {
        installRouter(location => this.path = location.pathname);
    }

    render() {
        return html`

            <aside class="mdc-drawer">
                <div class="mdc-drawer__content">
                    <nav class="mdc-list">
                    <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
                        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
                        <span class="mdc-list-item__text">Inbox</span>
                    </a>
                    <a class="mdc-list-item" href="#">
                        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
                        <span class="mdc-list-item__text">Outgoing</span>
                    </a>
                    <a class="mdc-list-item" href="#">
                        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
                        <span class="mdc-list-item__text">Drafts</span>
                    </a>
                    </nav>
                </div>
            </aside>
            <h1 class="mdc-typography--body1">Quantify</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/team">Our Team</a></li>
                <li><a href="/mission">Our Mission</a></li>
                <li><a href="/values">Our Values</a></li>
            </ul>
            
            <!--
            ${this.drawerState ? html`
                <mwc-button @click="${() => this.setDrawerState(false)}">Close</mwc-button>
            ` : html`
                <mwc-button @click="${() => this.setDrawerState(true)}">Open</mwc-button>
            `}
            -->

            <hr>
            ${renderRoute(this.route)}
            <p>${this.offline ? "offline" : ""}</p>
        `;
    }

    stateChanged(state: any) {
        console.log(state.app);
        const appState = state.app as AppState;
        this.offline = appState.offline;
        this.screenSize = appState.screenSize;
        this.drawerState = appState.drawer;
        this.route = appState.route;
    }

    setDrawerState(state: boolean) {
        store.dispatch(setDrawerState(state));
    }
}