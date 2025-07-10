export function updateCriteria({ optionList, option, removingCriteria }) {
  const elementIndex = optionList.findIndex(
    (o) => o.property === option.property,
  );

  if (elementIndex === -1) {
    optionList.push(option);
  }
  
  if (removingCriteria(option)) {
    optionList.splice(elementIndex, 1);
  } else {
    optionList[elementIndex] = option;
  }

  return optionList;
}
