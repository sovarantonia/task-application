/** Handles the form, item is for pre-exsting data (eg. update) */
export function handleFormData({
  sendTheDataFunction = null,
  onDataSent = null,
  formData,
  item,
}) {
  const formDataEntries = new FormData(formData);
  let obj = {};
  for (const [key, value] of formDataEntries.entries()) {
    obj[key] = value;
  }
  const toSend = item ? { ...item, ...obj } : obj;

  sendTheDataFunction(toSend).then(() => {
    onDataSent();
    formData.reset();
  });
}
