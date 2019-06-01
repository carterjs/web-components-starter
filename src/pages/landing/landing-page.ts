import { customElement, LitElement, html } from "lit-element";
import style from "./landing-page.scss";
import "@material/mwc-button/mwc-button";

@customElement("landing-page")
export class LandingPage extends LitElement {

    static get styles() {
        return style;
    }

    render() {
        return html`
            <h1 class="mdc-typography--headline3">Landing page</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod blandit fermentum. Fusce molestie leo quis sapien consequat ullamcorper. Suspendisse ante nibh, commodo ac turpis a, semper aliquet justo. Duis eu turpis non leo pretium congue nec quis lacus. Donec eu erat at elit pulvinar aliquam. Vestibulum pharetra placerat arcu, vitae volutpat felis ornare id. Maecenas faucibus dui ipsum, non dignissim tortor dictum ut.</p>
            <mwc-button @click="${this.sayHi}">Say hi</mwc-button>
        `;
    }

    sayHi() {
        alert("Hi!");
    }
}