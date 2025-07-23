export function updateSelectOptions(selectComponent, options = []) {
  let optionNo = selectComponent.options.length - 1;
  if (optionNo > 0) {
    for (let i = optionNo; i >= 0; i--) {
      selectComponent.remove(i);
    }
  }

  options.forEach((element) => {
    const opt = document.createElement("option");
    opt.value = element;
    opt.textContent = element;
    selectComponent.append(opt);
  });
}
