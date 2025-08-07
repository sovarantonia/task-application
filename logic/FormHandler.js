export class FormHandler {
  constructor({ sendTheDataFunction = null, onDataSent = null }) {
    this.sendTheDataFunction = sendTheDataFunction;
    this.onDataSent = onDataSent;
  }

  handleFormData = ({ formData, item = null }) => {
    const formDataEntries = new FormData(formData);
    let obj = {};
    for (const [key, value] of formDataEntries.entries()) {
      obj[key] = value;
    }
    const toSend = item ? { ...item, ...obj } : obj;
    
    this.sendTheDataFunction(toSend).then(() => {
      this.onDataSent();
      formData.reset();
    });
  };
}
