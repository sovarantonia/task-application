import { getCheckboxesState, renderUsers } from "../ui/renderUsers";

export class UserLogic {
  constructor({
    userService = null,
    pagerComponent = null,
    itemsPerPageSelector = null,
    checkboxSelectComponent = null,
  } = {}) {
    this.userService = userService;
    this.pagerComponent = pagerComponent;
    this.checkboxSelectComponent = checkboxSelectComponent;

    this.currentPage = 1;
    this.itemsPerPage = 5;

    itemsPerPageSelector.onChangeFunction = this.setItemsPerPage;

    this.userRenderer = renderUsers("userContainer");

    this.checkboxStateMap = new Map();
  }

  setItemsPerPage = (itemNrPerPage) => {
    this.itemsPerPage = parseInt(itemNrPerPage);
    this.currentPage = 1;
    this.getUsers();
  };

  getUsers() {
    this.userService
      .getPaginatedUsers({
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      })
      .then(({ paginatedItems, totalPages }) => {
        this.userRenderer(paginatedItems, this.onSelect);
        this.totalPages = totalPages;
        this.pagerComponent.renderPaginationResults({
          totalPages: totalPages,
          currentPage: this.currentPage,
        });
        this.checkboxSelectComponent.renderSelectedItemNr(
          this.checkboxStateMap.size,
        );
        getCheckboxesState(this.checkboxStateMap);
      });
  }

  onNext = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.getUsers();
  };

  onPrevious = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
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
