export function combineComparisonFunctions(compareFunctions) {
  return (a, b) => {
    for (const compareFunction of compareFunctions) {
      const result = compareFunction(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
}

export function multiFieldSort(criteria) {
  const compareFunctions = criteria.map(
    ({ property, direction, transform = (x) => x }) => {
      return (a, b) => {
        const aValue = transform(a[property]);
        const bValue = transform(b[property]);
        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      };
    },
  );

  return combineComparisonFunctions(compareFunctions);
}

export function dateParser(string) {
  return new Date(string);
}
