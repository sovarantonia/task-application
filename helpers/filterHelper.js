export function multiFieldFilter(criteria) {
  const filterFunctions = criteria.map(({ property, value }) => {
    return (item) => item[property] === value;
  });

  return combineFilterComparisonFunctions(filterFunctions);
}

export function combineFilterComparisonFunctions(functions) {
  return (item) => {
    return functions.every((f) => f(item));
  };
}
