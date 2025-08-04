import { createButton } from "../components/ButtonComponent";

export class SendEmailComponentUI {
  constructor({
    containerId,
    onUserListChanged = null,
    onUserListReceived = null,
  }) {
    this.onUserListChanged = onUserListChanged;
    const target = document.getElementById(containerId);
    this.onUserListReceived = onUserListReceived;

    this.sendEmailButton = createButton({
      text: "Send Email",
      onClick: () => {
        const idList = this.onUserListReceived();
        this.onUserListChanged({ idList: idList });
      },
    });

    target.append(this.sendEmailButton);
  }

  // renderSelectedCheckboxes = () => {
  //   const idList = this.onUserListReceived();
  //   for (let id of idList) {
  //     const checkbox = document.getElementById(id);
  //     checkbox.checked = true;
  //   }
  // };
}
