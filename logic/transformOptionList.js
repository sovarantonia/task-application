export function transformOptionList(list, property) {
  return {
    column: property,
    values: ["All", ...list.map((item) => item["id"])],
  };
}

export function modify(list, property) {
  return new Map(list.map((element) => [element.id, element[property]]));
}
