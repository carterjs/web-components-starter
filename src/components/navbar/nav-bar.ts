import { customElement, LitElement, html, property } from "lit-element";
import style from "./nav-bar.scss";

@customElement("nav-bar")
export class NavBar extends LitElement {

    @property({type: String})
    section: string | null = null;

    static get styles() {
        return style;
    }

    render() {
        return html`
            <h1 class="mdc-typography--body1">Quantify</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/team">Our Team</a></li>
                <li><a href="/mission">Our Mission</a></li>
                <li><a href="/values">Our Values</a></li>
            </ul>
        `;
    }
}