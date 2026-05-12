import { loadComments, addComment } from "./comments.js";
import { renderComments } from "./render.js";
import { checkAuth, getCurrentUser } from "./auth.js";
import { renderLoginForm } from "./renderLogin.js";
import { initEventHandlers } from "./eventHandlers.js";

export function showCommentsUI() {
  const authMessage = document.getElementById("auth-message");
  const commentsList = document.getElementById("comments-list");
  const addForm = document.getElementById("add-form");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");

  if (authMessage) authMessage.style.display = "none";
  if (commentsList) commentsList.style.display = "block";
  if (addForm) addForm.style.display = "block";
  if (loginContainer) loginContainer.style.display = "none";
  if (registerContainer) registerContainer.style.display = "none";

 
  const user = getCurrentUser();
  const nameInput = document.getElementById("name-input");
  if (nameInput && user) {
    nameInput.value = user.name;
  }
  
 
  initEventHandlers();
}

function showAuthMessage() {
  const authMessage = document.getElementById("auth-message");
  const commentsList = document.getElementById("comments-list");
  const addForm = document.getElementById("add-form");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");

  if (authMessage) authMessage.style.display = "block";
  if (commentsList) commentsList.style.display = "block";
  if (addForm) addForm.style.display = "none";
  if (loginContainer) loginContainer.style.display = "none";
  if (registerContainer) registerContainer.style.display = "none";
}

async function init() {
  await loadComments();
  renderComments();

  if (checkAuth()) {
    showCommentsUI();
  } else {
    showAuthMessage();
  }

  const authLink = document.getElementById("auth-link");
  if (authLink) {
  
    const newAuthLink = authLink.cloneNode(true);
    authLink.parentNode.replaceChild(newAuthLink, authLink);
    
    newAuthLink.addEventListener("click", (event) => {
      event.preventDefault();
      renderLoginForm();
    });
  }
}

document.addEventListener("DOMContentLoaded", init);