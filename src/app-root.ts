import { customElement, LitElement, html } from "lit-element";

@customElement("app-root")
export class AppRoot extends LitElement {
    render() {
        return html`
            <h1>Hello world!</h1>
        `;
    }
}