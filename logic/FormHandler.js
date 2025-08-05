export class FormHandler {
  constructor({ sendTheDataFunction = null }) {
    this.sendTheDataFunction = sendTheDataFunction;
  }

  handleFormData = ({ formData }) => {
    const formDataEntries = new FormData(formData);
    const obj = {};
    for (const [key, value] of formDataEntries.entries()) {
      obj[key] = value;
    }

    this.sendTheDataFunction(obj).then((result) => console.log(result));
  };
}
