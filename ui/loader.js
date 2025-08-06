export function hideLoader() {
  const loader = document.getElementById("loading");
  const overlay = document.getElementById("overlay");
  loader.style.display = "none";
  overlay.classList.add("hidden");
}

export function addLoader() {
  const loader = document.getElementById("loading");
  const overlay = document.getElementById("overlay");
  loader.style.display = "block";
  overlay.classList.remove("hidden");
}
