import {
  getPaginatedElements,
  getTotalPages,
} from "../logic/pagination/Pagination";
import { multiFieldSort } from "../helpers/sortHelper";
import { multiFieldFilter } from "../helpers/filterHelper";

export class DbService {
  constructor(initialData) {
    this.objectList = initialData;
  }

  save({ objToSave }) {
    return new Promise((resolve) => {
      this.objectList.push(objToSave);
      resolve(objToSave);
    });
  }

  update({ id, props }) {
    return new Promise((resolve, reject) => {
      const objToFind = this.objectList.find((obj) => obj.id === id);
      if (!objToFind) {
        return reject(`Object with id ${id} not found`);
      }

      Object.assign(objToFind, props);
      resolve(objToFind);
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const index = this.objectList.findIndex((o) => o.id === id);
      if (index !== -1) {
        const removed = this.objectList.splice(index, 1)[0];
        resolve(removed);
      } else {
        reject(`Object with id ${id} not found`);
      }
    });
  }

  findById(objId) {
    return new Promise((resolve, reject) => {
      const objToFind = this.objectList.find((obj) => obj.id === objId);
      if (objToFind !== undefined) {
        resolve(objToFind);
      } else {
        reject(`Object with id ${objId} not found`);
      }
    });
  }

  getPaginatedItems({
    currentPageNo,
    itemsPerPage,
    sortCriteria = [],
    filterCriteria = [],
  }) {
    return new Promise((resolve) => {
      let items = [...this.objectList];

      if (filterCriteria.length > 0) {
        items = items.filter(multiFieldFilter({ criteria: filterCriteria }));
      }

      if (sortCriteria.length > 0) {
        items = items.sort(multiFieldSort({ criteria: sortCriteria }));
      }

      const paginatedItems = getPaginatedElements({
        elementList: items,
        currentPageNo,
        itemsPerPage,
      });
      const totalPages = getTotalPages({ elementList: items, itemsPerPage });

      setTimeout(() => resolve({ paginatedItems, totalPages }), 2000);
    });
  }
}
