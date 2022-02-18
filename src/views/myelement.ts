import {LitElement, html} from 'lit-element';
import {customElement, property} from 'lit-element/decorators.js';

@customElement('my-element')
class MyElement extends LitElement {
    @property({type: String})
    description = 'Test';

  constructor() {
    super();
  }

  render() {
    return html`
      <div>Hello! ${this.description}</div>
      <div>My Test</div>
    `;
  }
}
