export function updateCriteria({ optionList, option, removingCriteria }) {
  console.log("OptionList:", optionList);
  console.log("Option:", option);
  console.log("Removing?", removingCriteria(option));
  const elementIndex = this.optionList.findIndex(
    (o) => o.property === option.property,
  );
  if (removingCriteria(option)) {
    if (elementIndex !== -1) {
      optionList.splice(index, 1);
    }
  } else {
    if (elementIndex === -1) {
      optionList.push(option);
    } else {
      optionList[elementIndex] = option;
    }
  }
}
