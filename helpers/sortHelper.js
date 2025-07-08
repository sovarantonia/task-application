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
  const compareFunctions = criteria
    .filter((c) => c.direction !== 0)
    .map(({ property, direction, transform = (x) => x }) => {
      return (a, b) => {
        const aValue = transform(a[property]);
        const bValue = transform(b[property]);
        if (aValue < bValue) return -direction;
        if (aValue > bValue) return direction;
        return 0;
      };
    });

  return combineComparisonFunctions(compareFunctions);
}

export function dateParser(string) {
  return new Date(string);
}
