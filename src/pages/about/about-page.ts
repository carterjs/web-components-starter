import { customElement, LitElement, html, property } from "lit-element";
import style from "./about-page.scss";

@customElement("about-page")
export class AboutPage extends LitElement {

    @property({type: String})
    section: string | null = null;

    static get styles() {
        return style;
    }

    render() {
        return html`
            <h1>About Us ${!!this.section ? `(section ${this.section})` : ""}</h1>
            <p>This is a paragraph about Quantify.</p>
        `;
    }
}