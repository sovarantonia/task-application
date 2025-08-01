export class ButtonComponent {
  createButton({ text = "", eventToAdd = null }) {
    const element = document.createElement("button");
    element.textContent = text;
    element.addEventListener("click", eventToAdd);
    return element;
  }
}
