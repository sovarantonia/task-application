import { CreateElementComponent } from "./CreateElementComponent";

export class CheckboxSelectComponent {
  constructor({ onClick = null } = {}) {
    this.onClick = onClick;
    this.createElementComponent = new CreateElementComponent();
    this.container = this.createElementComponent.createDiv();
    this.sendButton = this.createElementComponent.createButton({
      text: "Send email",
      eventToAdd: () => this.onClick?.(),
    });
    this.selectedItemNrSpan = this.createElementComponent.createSpan();
    this.container.append(this.selectedItemNrSpan, this.sendButton);
  }

  renderSelectedItemNr(selectedItemNr) {
    this.selectedItemNrSpan.innerText = `${selectedItemNr} user(s) selected`;
    this.selectedItemNrSpan.hidden = selectedItemNr <= 0;
    this.sendButton.disabled = selectedItemNr <= 0;
  }

  addContainer(containerId) {
    const target = document.getElementById(containerId);
    target.appendChild(this.container);
  }
}
