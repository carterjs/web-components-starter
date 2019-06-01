import { customElement, LitElement, html, property } from "lit-element";
import style from "./values-page.scss";

@customElement("values-page")
export class ValuesPage extends LitElement {

    @property({type: String})
    section: string | null = null;

    static get styles() {
        return style;
    }

    render() {
        return html`
            <h1>Our Values${!!this.section ? `(section ${this.section})` : ""}</h1>
            <p>This is a paragraph about the values Quantify strives to uphold.</p>
        `;
    }
}