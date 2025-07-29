import { getCheckboxesState, renderUsers } from "../ui/renderUsers";
import { UserService } from "../service/UserService";
import { PagerData } from "./PagerData";
import { PagerComponentUI } from "../ui/PagerComponentUI";
import { SortControlUI } from "../ui/SortControlUI";
import { FilterControlUI } from "../ui/FilterControlUI";
import { PaginationHandler } from "./PaginationHandler";
import { SortCriteriaHandler } from "./SortCriteriaHandler";
import { FilterCriteriaHandler } from "./FilterCriteriaHandler";
import { UserPresentationUI } from "../ui/UserPresentationUI";
import { transformOptionList } from "./transformOptionList";
export class UserLogic {
  constructor({ initialUserData = [] }) {
    this.userService = new UserService(initialUserData);
    this.pagerData = new PagerData();

    this.userPresentationUI = new UserPresentationUI("userContainer");

    this.pagerComponentUI = new PagerComponentUI({
      containerId: "userPageControls",
      onItemsPerPageChange: this.pagerData.setItemsPerPage,
      onCurrentPageChange: this.pagerData.setCurrentPageNo,
    });
    this.sortUserControlUI = new SortControlUI({
      containerId: "sortUserContainer",
      onSortCriteriaChanged: (column) =>
        this.sortCriteriaHandler.onSortCriteriaChanged(column),
      columnList: ["name"],
    });

    this.filterUserControlUI = new FilterControlUI({
      containerId: "filterUserContainer",
      onFilterCriteriaChanged: (column, newValue) =>
        this.filterCriteriaHandler.onFilterCriteriaChanged(column, newValue),
      columnOptionList: [],
    });

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.userService.getUsers,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.sortCriteriaHandler = new SortCriteriaHandler({
      onNotifyPaginationHandler: (sortCriteria) =>
        this.paginationHandler.onSortCriteriaChanged(sortCriteria),
    });

    this.filterCriteriaHandler = new FilterCriteriaHandler({
      onNotifyPaginationHandler: (filterCriteria) =>
        this.paginationHandler.onFilterCriteriaChanged(filterCriteria),
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
