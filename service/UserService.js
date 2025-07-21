import { DbService } from "./DbService";

export class UserService {
  constructor(userData) {
    this.service = new DbService(userData);
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

  sendEmail(userList) {
    return new Promise((resolve) => {
      const infoList = userList.map((element) => {
        const msg = `Sent mail to ${element.userName} (${element.email})`;
        console.log(msg);
        return msg;
      });
      resolve(infoList);
    });
  }

  getById(userId) {
    return this.service.findById(userId);
  }
}
