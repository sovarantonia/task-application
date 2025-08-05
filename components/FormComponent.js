import { createButton } from "./ButtonComponent.js";

export function createForm({ onSubmit = null, onClose = null, props = [] }) {
  const form = document.createElement("form");

  for (let prop of props) {
    const propLabel = document.createElement("label");
    propLabel.textContent = prop.name;
    propLabel.htmlFor = prop.id;

    const propInput = document.createElement("input");
    propInput.type = prop.inputType;
    propInput.id = prop.id;
    propInput.name = prop.id;

    form.append(propLabel, propInput);
  }

  const closeBtn = createButton({
    text: "Close",
    onClick: (e) => {
      e.preventDefault();
      onClose();
    },
  });
  const submitBtn = createButton({
    text: "Submit",
    onClick: (e) => {
      e.preventDefault();
      onSubmit({ formData: form });
    },
    type: "submit",
  });
  form.append(submitBtn, closeBtn);

  return form;
}
