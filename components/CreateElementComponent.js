export function createElementComponent({ elementType = "", text = "" }) {
  let element = document.createElement(elementType);
  switch (elementType) {
    case "span":
      element.textContent = text;
      break;

    case "div":
      break;

    case "p":
      element.innerText = text;
      break;
  }

  return element;
}
