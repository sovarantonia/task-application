export function setTheme({ theme }) {
  let themeValue = localStorage.getItem(theme);
  if (!themeValue) {
    themeValue = "0";
  }

  themeValue = ((parseInt(themeValue) + 1) % 2).toString();

  localStorage.setItem(theme, themeValue);

  getTheme({ theme });
}

export function getTheme({ theme }) {
  const root = document.documentElement;
  let themeValue = localStorage.getItem(theme);
  switch (themeValue) {
    case "1":
      root.className = "dark";
      break;

    default:
      root.className = "light";
      break;
  }
}
