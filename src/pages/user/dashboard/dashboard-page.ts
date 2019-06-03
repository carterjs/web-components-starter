import { customElement, LitElement, html, property } from "lit-element";
import style from "./dashboard-page.scss";

import "@material/mwc-button/mwc-button";
import { signIn, signOut } from "../../../actions/user";
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../../../store";
import { navigate } from "../../../actions/app";

@customElement("dashboard-page")
export class SignInPage extends connect(store)(LitElement) {

    @property({type: String})
    username: string | null = null;

    @property({type: Boolean})
    signedIn: boolean | null = null;

    static get styles() {
        return style;
    }

    render() {
        if(this.signedIn != null) {
            if(this.signedIn) {
                return html`
                    <h1>Hello, ${this.username}</h1>
                    <mwc-button @click="${this.signOut}">Sign out</mwc-button>
                `;
            } else {
                this.leave();
            }
        }
        return html`loading...`;
    }

    signOut() {
        store.dispatch(signOut());
        this.leave();
    }

    leave() {
        history.pushState({}, "", "/signin");
        store.dispatch(navigate(window.location.pathname));
    }

    stateChanged(state: any) {
        this.username = state.user.username;
        this.signedIn = state.user.signedIn;
    }
}