export function getPaginatedElements(
  elementList,
  { currentPage, itemsPerPage },
) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return elementList.slice(start, end);
}

export function getTotalPages(elementList, itemsPerPage) {
  return Math.ceil(elementList.length / itemsPerPage);
}
