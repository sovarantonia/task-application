import { generateGUID } from "../helpers/guidHelper.js";
import { DbService } from "./DbService";

export class UserService {
  constructor(userData) {
    this.service = new DbService(userData);
  }

  saveUser({user}) {
    const id = generateGUID();
    user.id = id;
    return this.service.save({objToSave: user});
  }

  getPaginatedUsers = (
    { currentPageNo, itemsPerPage },
    sortCriteria = [],
    filterCriteria = [],
  ) => {
    return this.service.getPaginatedItems(
      { currentPageNo, itemsPerPage },
      sortCriteria,
      filterCriteria,
    );
  };

  sendEmail({userList}) {
    return new Promise((resolve) => {
      const infoList = userList.map((element) => {
        return `Sent mail to ${element.name} (${element.email})`;
      });
      resolve(infoList);
    });
  }

  getById(userId) {
    return this.service.findById(userId);
  }
}
