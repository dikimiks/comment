import { renderComments } from "./render.js";
import { addEventListeners } from "./eventHandlers.js";
import { loadComments } from "./comments.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComments(); 
  renderComments(); 
  addEventListeners(); 
});
