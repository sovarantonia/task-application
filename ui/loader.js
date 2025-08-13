export const loaderUtils = {
  addLoader: () => {
    const loader = document.getElementById("loading");
    const overlay = document.getElementById("overlay");
    loader.classList.remove("hidden");
    overlay.classList.remove("hidden");
  },
  hideLoader: () => {
    const loader = document.getElementById("loading");
    const overlay = document.getElementById("overlay");
    loader.classList.add("hidden");
    overlay.classList.add("hidden");
  },
};