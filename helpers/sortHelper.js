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
  const compareFunctions = criteria.map((arr) => {
    return arr.map(() => {
      return (a, b) => {
        if (a[0] === b[0]) return 0;
        return a[0] < b[0] ? -1 : 1;
      };
    });
  });

  return combineComparisonFunctions(compareFunctions);
}
