import { UserService } from '../service/UserService.js';
import { PagerData } from '../logic/pagination/PagerData.js';
import { PaginationHandler } from '../logic/pagination/PaginationHandler.js';
import { PagerComponentUI } from '../ui/PagerComponentUI.js';
import { UserPresentationUI } from '../ui/UserPresentationUI.js';
import { SendEmailComponentUI } from '../ui/SendEmailComponentUI.js';
import { CheckboxHandler } from './CheckboxHandler.js';
import { SendEmailHandler } from './SendEmailHandler.js';
import { CheckboxCheckUI } from '../ui/CheckboxCheckUI.js';
import { AddUserUI } from '../ui/AddUserUI.js';
import { handleFormData } from './FormHandler.js';
import { addUser, getAllUsers, getPaginatedUsers } from '../service/api.js';
export class UserLogic {
  constructor({ initialUserData = [], onUserListChanged = null }) {
    this.onUserListChanged = onUserListChanged;

    this.userService = new UserService(initialUserData);
    this.pagerData = new PagerData({});

    this.paginationHandler = new PaginationHandler({
      paginationFunction: getPaginatedUsers,
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
      onCheckboxChanged: this.checkboxCheckUI.renderCheckboxChecks,
    });

    this.userPresentationUI = new UserPresentationUI({
      containerId: 'userContainer',
      onCheckboxChecked: this.checkboxHandler.onCheckboxChecked,
    });

    this.sendEmailComponentUI = new SendEmailComponentUI({
      containerId: 'sendEmailActionControl',
      onUserListChanged: this.sendEmailHandler.sendEmail,
      onUserListReceived: this.checkboxHandler.getCheckedKeys,
    });

    const { setItemsPerPage, setCurrentPageNo } = this.pagerData;

    this.pagerComponentUI = new PagerComponentUI({
      containerId: 'userPageControls',
      onItemsPerPageChange: setItemsPerPage,
      onCurrentPageChange: setCurrentPageNo,
    });

    this.AddUserUI = new AddUserUI({
      containerId: 'addUserContainer',
      onSubmit: ({ formData }) => {
        handleFormData({
          sendTheDataFunction: (item) =>
           addUser(item),
          onDataSent: () => {
            this.AddUserUI.closeModal();
            this.paginationHandler.getPaginatedItems();
            // this.onUserListChanged({
            //   userList: this.userService.service.objectList,
            // });
          },
          formData,
        });
      },
    });
  }

  onPaginationResponse = ({ paginatedItems, totalPages, currentPageNo }) => {
    this.userPresentationUI.renderUsers({ paginatedItems });

    this.pagerComponentUI.updateSelect({
      currentPageNo,
      totalPages,
    });

    this.checkboxCheckUI.renderCheckboxChecks(
      this.checkboxHandler.checkboxStateMap,
    );
  };

  onSendEmailResponse = ({ userInfoList }) => {
    userInfoList.forEach((message) => {
      console.log(message);
    });
  };

  init() {
    this.pagerData.init();
    getAllUsers().then((users) => {
      this.onUserListChanged({ userList: users });
      return users;
    });
  }
}
