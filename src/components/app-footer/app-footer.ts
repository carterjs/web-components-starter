import { customElement, LitElement, html, property } from "lit-element";
import style from "./app-footer.scss";

import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../../store";
import { SCREEN_SIZE } from "../../types/screenSize";

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
            <footer>
                <nav class="links">
                    <a href="">Terms</a>
                    <a href="">Privacy</a>
                    <a href="">Security</a>
                    <a href="">Services</a>
                    <a href="">Help</a>
                    <span style="flex: auto;"></span>
                    <a href="">Contact</a>
                    <a href="">Blog</a>
                    <a href="">About</a>
                    <a href="">Team</a>
                    <a href="">Mission</a>
                </nav>
                
                <small>&copy; 2019 Cabana</small>
            </footer>
        `;
        
    }

    stateChanged(state: any) {
        this.opened = state.app.drawer;
        this.screenSize = state.app.screenSize;
    }
}