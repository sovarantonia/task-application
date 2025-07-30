import { UserService } from "../service/UserService";
import { PagerData } from "./PagerData";
import { PagerComponentUI } from "../ui/PagerComponentUI";
import { SortControlUI } from "../ui/SortControlUI";
import { PaginationHandler } from "./PaginationHandler";
import { SortCriteriaHandler } from "./SortCriteriaHandler";
import { UserPresentationUI } from "../ui/UserPresentationUI";
export class UserLogic {
  constructor({ initialUserData = [] }) {
    this.userService = new UserService(initialUserData);
    this.pagerData = new PagerData();

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.userService.getUsers,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.sortCriteriaHandler = new SortCriteriaHandler({
      onNotifyPaginationHandler: this.paginationHandler.onSortCriteriaChanged,
    });

    this.userPresentationUI = new UserPresentationUI("userContainer");

    this.pagerComponentUI = new PagerComponentUI({
      containerId: "userPageControls",
      onItemsPerPageChange: this.pagerData.setItemsPerPage,
      onCurrentPageChange: this.pagerData.setCurrentPageNo,
    });
    this.sortUserControlUI = new SortControlUI({
      containerId: "sortUserContainer",
      onSortCriteriaChanged: this.sortCriteriaHandler.onSortCriteriaChanged,
      columnList: ["user"],
    });

    // this.checkboxStateMap = new Map();
  }

  onPaginationResponse = ({ paginatedItems, totalPages }) => {
    this.userPresentationUI.renderUsers(
      { paginatedItems, totalPages },
      this.pagerData.currentPageNo,
    );

    this.pagerComponentUI.updateSelect(
      this.pagerData.currentPageNo,
      totalPages,
    );
  };

  init() {
    this.pagerData.init();
  }

  // onSelect = (userId, isChecked) => {
  //   isChecked
  //     ? this.checkboxStateMap.set(userId, isChecked)
  //     : this.checkboxStateMap.delete(userId);
  //   this.checkboxSelectComponent.renderSelectedItemNr(
  //     this.checkboxStateMap.size,
  //   );
  // };

  // onClick = () => {
  //   const promises = [];
  //   for (const id of this.checkboxStateMap.keys()) {
  //     promises.push(this.userService.getById(id));
  //   }

  //   Promise.all(promises)
  //     .then((userInfoList) => {
  //       return this.userService.sendEmail(userInfoList);
  //     })
  //     .then((messages) => {
  //       messages;
  //     });
  // };
}
