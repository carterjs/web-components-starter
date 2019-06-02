import { customElement, LitElement, html, property } from "lit-element";

import "@material/mwc-button/mwc-button";

import style from "./app-navigation.scss";

import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../../store";
import { SCREEN_SIZE } from "../../actions/types";

@customElement("app-navigation")
export class AppNavigation extends connect(store)(LitElement) {

    @property({type: Boolean})
    opened = false;

    @property({type: SCREEN_SIZE})
    screenSize = SCREEN_SIZE.SMALL;

    static get styles() {
        return style;
    }

    render() {
        return html`
            <nav class="navigation-wrapper">
                <ul class="navigation-pages">
                    <li><a href="/">Home</a></li>
                    <li><a href="/team">Our Team</a></li>
                    <li><a href="/mission">Our Mission</a></li>
                    <li><a href="/values">Our Values</a></li>
                </ul>
                <mwc-button>Log In</mwc-button>
            </nav>
            <hr>
        `;
        
    }

    stateChanged(state: any) {
        this.opened = state.app.drawer;
        this.screenSize = state.app.screenSize;
    }
}