export class CreateElementComponent {
  constructor(containerId = null) {
    this.target = document.getElementById(containerId);
  }

  createElement({
    elementType = "",
    text = "",
    eventToAdd = null,
    inputType = "",
  } = {}) {
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

      // case "checkbox":
      //   // element = document.createElement("input");
      //   // element.type = "checkbox";
      //   // element.value = value;
      //   // element.addEventListener("change", eventToAdd);
      //   break;

      default:
        break;
    }
    this.target.append(element);

    return element;
  }
}
