import { UserService } from "../service/UserService";
import { PagerData } from "../logic/pagination/PagerData";
import { PaginationHandler } from "../logic/pagination/PaginationHandler";
import { PagerComponentUI } from "../ui/PagerComponentUI";
import { UserPresentationUI } from "../ui/UserPresentationUI";
import { SendEmailComponentUI } from "../ui/SendEmailComponentUI";
import { CheckboxHandler } from "./CheckboxHandler";
import { SendEmailHandler } from "./SendEmailHandler";
import { CheckboxCheckUI } from "../ui/CheckboxCheckUI";
export class UserLogic {
  constructor({ initialUserData = [] }) {
    this.userService = new UserService(initialUserData);
    this.pagerData = new PagerData();

    this.paginationHandler = new PaginationHandler({
      paginationFunction: this.userService.getPaginatedUsers,
      onPaginationResponse: this.onPaginationResponse,
      pagerData: this.pagerData,
    });

    this.sendEmailHandler = new SendEmailHandler({
      sendEmailFunction: this.userService.sendEmail,
      onSendEmailResponse: this.onSendEmailResponse,
    });

    this.checkboxCheckUI = new CheckboxCheckUI();

    this.checkboxHandler = new CheckboxHandler({
      objectList: initialUserData,
      onCheckboxChanged: this.checkboxCheckUI.renderCheckboxChecks
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

    this.checkboxCheckUI.renderCheckboxChecks(this.checkboxHandler.checkboxStateMap);
  };

  onSendEmailResponse = ({ userInfoList }) => {
    userInfoList.forEach((message) => {
      console.log(message);
    });
  };

  init() {
    this.pagerData.init();
  }
}
