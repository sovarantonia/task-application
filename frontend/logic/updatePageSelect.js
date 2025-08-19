export function updatePageSelectOptions({
  selectComponent,
  totalPages,
  currentPage,
}) {
  let optionNo = selectComponent.options.length - 1;
  if (optionNo > 0) {
    for (let i = optionNo; i >= 0; i--) {
      selectComponent.remove(i);
    }
  }

  const options = Array.from({ length: totalPages }, (_, i) => i + 1);

  options.forEach((element) => {
    const opt = document.createElement("option");
    opt.value = element;
    opt.textContent = element;
    selectComponent.append(opt);
  });

  if (totalPages > 0) {
    selectComponent.options[currentPage - 1].selected = true;
  }
}
