import { renderUsers } from "../ui/renderUsers";

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

    this.userList = [];
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
        this.checkboxSelectComponent.renderSelectedItemNr(this.userList.length);
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
    const index = this.userList.findIndex((e) => e.id === userId);

    isChecked ? this.userList.push(userId) : this.userList.splice(index, 1);
    console.log(this.userList);
    this.checkboxSelectComponent.renderSelectedItemNr(this.userList.length);
  };

  onClick = () => {
    const promises = this.userList.map((id) => this.userService.getById(id));

    Promise.all(promises)
      .then((userInfoList) => {
        return this.userService.sendEmail(userInfoList);
      })
      .then((messages) => {
        messages;
      });
  };
}
