import { createElementComponent } from "./createElementComponent.js";

export function createModal({
  headerContent = [],
  bodyContent = [],
  footerContent = [],
}) {
  const modal = createElementComponent({ elementType: "div" });
  const header = createElementComponent({ elementType: "div" });
  const body = createElementComponent({ elementType: "div" });
  const footer = createElementComponent({ elementType: "div" });

  headerContent.forEach((element) => header.append(element));
  bodyContent.forEach((element) => body.append(element));
  footerContent.forEach((element) => footer.append(element));

  modal.append(header, body, footer);
  return modal;
}
