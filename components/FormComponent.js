import { createButton } from "./ButtonComponent.js";

export function createForm({ onSubmit = null, props = [] }) {
  const form = document.createElement("form");

  for (let prop of props) {
    const propLabel = document.createElement("label");
    propLabel.textContent = prop.name;
    propLabel.htmlFor = prop.id;

    const propInput = document.createElement("input");
    propInput.type = prop.inputType;
    propInput.id = prop.id;
    propInput.name = prop.id;
    propInput.required = prop.isRequired;

    form.append(propLabel, propInput);
  }

  const submitBtn = createButton({
    text: "Submit",
    type: "submit",
  });
  form.append(submitBtn);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit({ formData: form });
  });

  return form;
}
