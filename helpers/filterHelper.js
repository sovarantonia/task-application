export function multiFieldFilter(criteria) {
  const filterFunctions = criteria.map(
    ({ property, value, transform = (x) => x }) => {
      return (item) => transform(item[property]) == value;
    },
  );

  return (item) => {
    filterFunctions.every((func) => func(item));
  };
}
