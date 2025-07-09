import { getPaginatedElements, getTotalPages } from "../service/Pagination";
import { multiFieldSort } from "../helpers/sortHelper";
import { multiFieldFilter } from "../helpers/filterHelper";

export class DbService {
  constructor(initialData) {
    this.objectList = initialData;
  }

  save(objToSave) {
    return new Promise((resolve) => {
      this.objectList.push(objToSave);
      resolve(objToSave);
    });
  }

  update(id, props) {
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

  getAll() {
    return new Promise((resolve) => {
      resolve(this.objectList);
    });
  }

  getPaginatedItems(
    { currentPage, itemsPerPage },
    sortCriteria = [],
    filterCriteria = [],
  ) {
    return new Promise((resolve) => {
      let items = [...this.objectList];

      if (filterCriteria.length > 0 && sortCriteria.length > 0) {
        items = items
          .filter(multiFieldFilter(filterCriteria))
          .sort(multiFieldSort(sortCriteria));
      } else if (sortCriteria.length > 0) {
        items = items.sort(multiFieldSort(sortCriteria));
      } else if (filterCriteria.length > 0) {
        items = items.filter(multiFieldFilter(filterCriteria));
      }

      // if (filterCriteria.length == 0 && sortCriteria.length == 0) {
      //   resolve(items);
      // }



      const paginatedItems = getPaginatedElements(items, {
        currentPage,
        itemsPerPage,
      });

      const totalPages = getTotalPages(items, itemsPerPage);
      resolve({paginatedItems, totalPages});
    });
  }

  getTotalPages(itemsPerPage) {
    return new Promise((resolve) => {
      resolve(getTotalPages(this.objectList, itemsPerPage));
    });
  }
}
