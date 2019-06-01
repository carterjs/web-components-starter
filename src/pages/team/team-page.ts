import { customElement, LitElement, html, property } from "lit-element";
import style from "./team-page.scss";

@customElement("team-page")
export class TeamPage extends LitElement {

    @property({type: String})
    section: string | null = null;

    static get styles() {
        return style;
    }

    render() {
        return html`
            <h1>Our Team${!!this.section ? `(section ${this.section})` : ""}</h1>
            <p>This is a paragraph about the team.</p>
        `;
    }
}