export class CreateElementComponent {
  constructor(containerId = null) {
    this.target = document.getElementById(containerId);
  }

  createElement({ elementType = "", text = "", eventToAdd = null } = {}) {
    let element = document.createElement(elementType);
    switch (elementType) {
      case "button":
        element.textContent = text;
        element.addEventListener("click", eventToAdd);
        break;

      case "span":
        element.textContent = text;
        break;

      case "div":
        break;

      case "p":
        element.innerText = text;
        break;

      default:
        break;
    }
    this.target.append(element);

    return element;
  }
}
