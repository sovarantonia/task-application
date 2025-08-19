export class SendEmailHandler {
  constructor({ sendEmailFunction = null, onSendEmailResponse = null }) {
    this.sendEmailFunction = sendEmailFunction;
    this.onSendEmailResponse = onSendEmailResponse;
  }

  sendEmail = ({ idList }) => {
    this.sendEmailFunction({ userList: idList }).then((userInfoList) => {
      this.onSendEmailResponse({ userInfoList });
    });
  };
}
