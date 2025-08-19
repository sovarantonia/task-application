export function combineComparisonFunctions({compareFunctions}) {
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

export function multiFieldSort({criteria}) {
  const compareFunctions = criteria.map(({ property, direction }) => {
    return (a, b) => {
      if (a[property] === b[property]) return 0;
      return a[property] < b[property] ? -direction : direction;
    };
  });

  return combineComparisonFunctions({compareFunctions});
}
