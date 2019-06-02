import { customElement, LitElement, html, property } from "lit-element";
import style from "./app-footer.scss";

import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../../store";
import { SCREEN_SIZE } from "../../actions/types";

@customElement("app-footer")
export class AppFooter extends connect(store)(LitElement) {

    @property({type: Boolean})
    opened = false;

    @property({type: SCREEN_SIZE})
    screenSize = SCREEN_SIZE.SMALL;

    static get styles() {
        return style;
    }

    render() {
        return html`
            <hr>
            <ul>
                <li>This is a footer</li>
            </ul>
        `;
        
    }

    stateChanged(state: any) {
        this.opened = state.app.drawer;
        this.screenSize = state.app.screenSize;
    }
}