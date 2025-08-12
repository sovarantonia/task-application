export function setTheme({theme}) {
  let themeValue = localStorage.getItem(theme);
  localStorage.setItem(theme, "0");
  if (themeValue) {
    themeValue = toString((parseInt(theme) + 1) % 2);
    localStorage.setItem(theme, themeValue) 
  }

  const root = document.documentElement;
  if (themeValue == "0") {
    root.className = "light";
  } else {
    root.className = "dark";
  }
}
