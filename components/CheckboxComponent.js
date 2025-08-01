export class CheckboxComponent {
  createCheckbox({ value = "", eventToAdd = null }) {
    const element = document.createElement("input");
    element.type = "checkbox";
    element.value = value;
    element.addEventListener("click", eventToAdd);
    
    return element;
  }

  // renderSelectedItemNr(selectedItemNr) {
  //   this.selectedItemNrSpan.innerText = `${selectedItemNr} user(s) selected`;
  //   this.selectedItemNrSpan.hidden = selectedItemNr <= 0;
  //   this.sendButton.disabled = selectedItemNr <= 0;
  // }

  // addContainer(containerId) {
  //   const target = document.getElementById(containerId);
  //   target.appendChild(this.container);
  // }
}
