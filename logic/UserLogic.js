import { getCheckboxesState, renderUsers } from "../ui/renderUsers";

export class UserLogic {
  constructor({
    userService = null,
    pagerComponent = null,
    checkboxSelectComponent = null,
  } = {}) {
    this.userService = userService;
    this.pagerComponent = pagerComponent;
    this.checkboxSelectComponent = checkboxSelectComponent;

    this.paginationData = this.pagerComponent.paginationData;

    this.userRenderer = renderUsers("userContainer");

    this.checkboxStateMap = new Map();
  }

  //   setItemsPerPage = (itemNrPerPage) => {
  //     this.itemsPerPage = parseInt(itemNrPerPage);
  //     this.currentPageNo = 1;
  //     this.getUsers();
  //   };

  getUsers() {
    this.userService
      .getPaginatedUsers(this.paginationData)
      .then(({ paginatedItems, totalPages }) => {
        this.userRenderer(paginatedItems, this.onSelect);
        this.totalPages = totalPages;
        this.pagerComponent.renderPaginationResults({
          totalPages: totalPages,
          currentPageNo: this.paginationData.currentPageNo,
        });
        this.checkboxSelectComponent.renderSelectedItemNr(
          this.checkboxStateMap.size,
        );
        getCheckboxesState(this.checkboxStateMap);
      });
  }

  onNext = () => {
    if (this.paginationData.currentPageNo < this.totalPages) {
      this.paginationData.currentPageNo++;
    }
    this.getUsers();
  };

  onPrevious = () => {
    if (this.paginationData.currentPageNo > 1) {
      this.paginationData.currentPageNo--;
    }
    this.getUsers();
  };

  onSelect = (userId, isChecked) => {
    isChecked
      ? this.checkboxStateMap.set(userId, isChecked)
      : this.checkboxStateMap.delete(userId);
    this.checkboxSelectComponent.renderSelectedItemNr(
      this.checkboxStateMap.size,
    );
  };

  onClick = () => {
    const promises = [];
    for (const id of this.checkboxStateMap.keys()) {
      promises.push(this.userService.getById(id));
    }

    Promise.all(promises)
      .then((userInfoList) => {
        return this.userService.sendEmail(userInfoList);
      })
      .then((messages) => {
        messages;
      });
  };
}
