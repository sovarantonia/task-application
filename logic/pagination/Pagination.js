export function getPaginatedElements(
  { elementList, currentPageNo, itemsPerPage },
) {
  const start = (currentPageNo - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return elementList.slice(start, end);
}

export function getTotalPages({elementList, itemsPerPage}) {
  return Math.ceil(elementList.length / itemsPerPage);
}
