import { ButtonComponent } from "../components/ButtonComponent";
import { createElementComponent } from "../components/createElementComponent";

export class SendEmailComponentUI {
  constructor({ containerId, onUserListChanged = null, onUserListReceived = null }) {
    this.onUserListChanged = onUserListChanged;
    const target = document.getElementById(containerId);
    const button = new ButtonComponent();

    this.sendEmailButton = button.createButton({
      text: "Send Email",
      eventToAdd: () => {
        const idList = onUserListReceived();
        this.onUserListChanged({ idList: idList });
      },
    });


    target.append(this.sendEmailButton);
  }
}
