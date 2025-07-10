export function updateCriteria({ optionList, option, removingCriteria }) {
  const elementIndex = optionList.findIndex(
    (o) => o.property === option.property,
  );
  if (removingCriteria(option)) {
    if (elementIndex !== -1) {
      return optionList.splice(elementIndex, 1);
    }
  } else {
    if (elementIndex === -1) {
      optionList.push(option);
      return optionList;
    } else {
      optionList[elementIndex] = option;
      return optionList;
    }
  }
}
