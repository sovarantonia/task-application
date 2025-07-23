export function updateSelectOptions(
  selectComponent,
  options = [],
  currentPage,
) {
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

  selectComponent.options[currentPage - 1].selected = true;
}
