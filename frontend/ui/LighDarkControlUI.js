import { createButton } from "../components/ButtonComponent.js";
import { getTheme } from "./setTheme.js";

export class LighDarkControlUI {
  constructor({ containerId = null, onClick }) {
    const target = document.getElementById(containerId);
    const controlBtn = createButton({ text: "Change theme", onClick: onClick });

    getTheme({ theme: "isDark" });

    target.append(controlBtn);
  }
}
