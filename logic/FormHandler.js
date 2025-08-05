export class FormHandler {
  constructor({ sendTheDataFunction = null, onDataSent = null }) {
    this.sendTheDataFunction = sendTheDataFunction;
    this.onDataSent = onDataSent;
  }

  handleFormData = ({ formData }) => {
    const formDataEntries = new FormData(formData);
    const obj = {};
    for (const [key, value] of formDataEntries.entries()) {
      obj[key] = value;
    }

    this.sendTheDataFunction(obj).then(() => {
      this.onDataSent();
    });
  };
}
