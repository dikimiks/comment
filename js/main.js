import { renderComments } from "./render.js";
import { addEventListeners } from "./eventHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
  renderComments();
  addEventListeners();
});
