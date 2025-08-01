import { UserService } from "../service/UserService";
import { PagerData } from "./PagerData";
import { PagerComponentUI } from "../ui/PagerComponentUI";
import { PaginationHandler } from "./PaginationHandler";
import { UserPresentationUI } from "../ui/UserPresentationUI";
import { SendEmailComponentUI } from "../ui/SendEmailComponentUI";
import { CheckboxHandler } from "./CheckboxHandler";
import { SendEmailHandler } from "./SendEmailHandler";
export class UserLogic {
  constructor({ initialUserData = [] }) {
    this.userService = new UserService(initialUserData);
    this.pagerData = new PagerData();

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.userService.getPaginatedUsers,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.checkboxHandler = new CheckboxHandler();

    this.sendEmailHandler = new SendEmailHandler({
      sendEmailFunction: this.userService.sendEmail,
      onSendEmailResponse: this.onSendEmailResponse,
    });

    this.userPresentationUI = new UserPresentationUI({
      containerId: "userContainer",
      onCheckboxChecked: this.checkboxHandler.onCheckboxChecked,
    });

    this.sendEmailComponentUI = new SendEmailComponentUI({
      containerId: "sendEmailActionControl",
      onUserListChanged: this.sendEmailHandler.sendEmail,
      onUserListReceived: this.checkboxHandler.getCheckedKeys,
    });

    const { setItemsPerPage, setCurrentPageNo } = this.pagerData;

    this.pagerComponentUI = new PagerComponentUI({
      containerId: "userPageControls",
      onItemsPerPageChange: setItemsPerPage,
      onCurrentPageChange: setCurrentPageNo,
    });
  }

  onPaginationResponse = ({ paginatedItems, totalPages, currentPageNo }) => {
    this.userPresentationUI.renderUsers({ paginatedItems });

    this.pagerComponentUI.updateSelect({
      currentPageNo,
      totalPages,
    });
  };

  onSendEmailResponse = ({ userInfoList }) => {
    userInfoList.forEach((message) => {
      console.log(message);
    });
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
