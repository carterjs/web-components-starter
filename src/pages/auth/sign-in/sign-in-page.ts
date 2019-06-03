import { customElement, LitElement, html, property } from "lit-element";
import style from "./sign-in-page.scss";

import "@material/mwc-button/mwc-button";
import { signIn } from "../../../actions/user";
import { store } from "../../../store";
import { navigate } from "../../../actions/app";

@customElement("sign-in-page")
export class SignInPage extends LitElement {

    @property({type: String})
    username = "";

    @property({type: String})
    password = "";

    static get styles() {
        return style;
    }

    render() {
        return html`
            <div>
                <h1>Sign In</h1>
                <label>
                    Username:
                    <input type="text" placeholder="Username" .value="${this.username}" @change="${(e: { target: any; }) => this.username = e.target.value}">
                </label>
                <label>
                    Password:
                    <input type="password" placeholder="Password" .value="${this.password}" @change="${(e: { target: any }) => this.password = e.target.value}">
                </label>
                <mwc-button @click="${this.signIn}">Sign In</mwc-button>
            </div>
            <p>or <a href="/register">register</a></p>
        `;
    }

    signIn() {
        store.dispatch(signIn(this.username, this.password));
        history.pushState({}, "", "/dashboard");
        store.dispatch(navigate(window.location.pathname));
    }
}