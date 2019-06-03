import { customElement, LitElement, html, property } from "lit-element";

import "@material/mwc-button/mwc-button";

import style from "./app-header.scss";

import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../../store";
import { SCREEN_SIZE } from "../../actions/types";

@customElement("app-header")
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
            <nav class="navigation">
                <a href="/" class="title">LOGO</a>
                <a href="/team">Our Team</a>
                <a href="/mission">Our Mission</a>
                <a href="/values">Our Values</a>
                <span style="flex: auto;"></span>
                <mwc-button>Sign In</mwc-button>
            </nav>
        `;
        
    }

    stateChanged(state: any) {
        this.opened = state.app.drawer;
        this.screenSize = state.app.screenSize;
    }
}