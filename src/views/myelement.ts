import {LitElement, html} from 'lit-element';
import {customElement, property} from 'lit-element/decorators.js';

@customElement('my-element')
class MyElement extends LitElement {
    @property({type: String})
    name = 'Luis';

  constructor() {
    super();
  }

  render() {
    return html`
      <div>Hello from MyElement! ${this.name}</div>
    `;
  }
}
