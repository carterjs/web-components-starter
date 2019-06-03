import { customElement, LitElement, html, property } from "lit-element";
import style from "./register-page.scss";

import "@material/mwc-button/mwc-button";
import { register } from "../../../actions/user";
import { store } from "../../../store";
import { navigate } from "../../../actions/app";

@customElement("register-page")
export class RegisterPage extends LitElement {

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
                <h1>Register</h1>
                <label>
                    Username:
                    <input type="text" placeholder="Username" .value="${this.username}" @change="${(e: { target: any; }) => this.username = e.target.value}">
                </label>
                <label>
                    Password:
                    <input type="password" placeholder="Password" .value="${this.password}" @change="${(e: { target: any }) => this.password = e.target.value}">
                </label>
                <label>
                    Confirm Password:
                    <input type="password" placeholder="Password">
                </label>
                <mwc-button @click="${this.register}">Register</mwc-button>
            </div>
            <p>or <a href="/signin">sign in</a></p>
        `;
    }

    register() {
        store.dispatch(register(this.username, this.password));
        history.pushState({}, "", "/dashboard");
        store.dispatch(navigate(window.location.pathname));
    }
}