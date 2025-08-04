export function createButton({ text = "", onClick = null }) {
  const element = document.createElement("button");
  element.textContent = text;
  element.addEventListener("click", onClick);
  return element;
}
