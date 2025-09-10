import { createButton } from "../components/ButtonComponent.js";

export class CookieControlUI {
  constructor({ containerId, onCheckBtnClick, onDeleteBtnClick }) {
      const target = document.getElementById(containerId);
      const checkCookieBtn = createButton({ text: "Check cookie", onClick: onCheckBtnClick });
      const deleteCookieBtn = createButton({ text: "Delete cookie", onClick: onDeleteBtnClick });
      
      target.append(checkCookieBtn, deleteCookieBtn);
  }
}
