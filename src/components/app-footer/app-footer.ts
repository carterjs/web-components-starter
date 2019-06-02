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
            <div class="footer-wrapper">
                <ul class="footer-left-list">
                    <li>© 2019 Cabana, Inc.</li>
                    <li><a href="">Terms</a></li>
                    <li><a href="">Privacy</a></li>
                    <li><a href="">Security</a></li>
                    <li><a href="">Services</a></li>
                    <li><a href="">Help</a></li>
                </ul>
                <img class="footer-logo">*Quantify Logo*</img>
                <ul class="footer-right-list">
                    <li><a href="">Contact</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Team</a></li>
                    <li><a href="">Mission</a></li>
                </ul>
            <div>
        `;
        
    }

    stateChanged(state: any) {
        this.opened = state.app.drawer;
        this.screenSize = state.app.screenSize;
    }
}