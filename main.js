import { renderComments } from "./render.js";
import { loadComments } from "./comments.js";
import { checkAuth } from "./auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComments();
  renderComments();

  if (checkAuth()) {
    showCommentsUI();
  } else {
    showAuthMessage();
  }

  const authLink = document.getElementById("auth-link");
  if (authLink) {
    authLink.addEventListener("click", (event) => {
      event.preventDefault();
      showLoginForm();
    });
  }
});

function showAuthMessage() {
  const authMessage = document.getElementById("auth-message");
  if (!authMessage) {
    console.error("auth-message не найден");
    return;
  }
  authMessage.style.display = "block";
  
  const commentsList = document.getElementById("comments-list");
  if (commentsList) commentsList.style.display = "block";
  
  const addForm = document.getElementById("add-form");
  if (addForm) addForm.style.display = "none";
  
  const loginContainer = document.getElementById("login-container");
  if (loginContainer) loginContainer.style.display = "none";
  
  const registerContainer = document.getElementById("register-container");
  if (registerContainer) registerContainer.style.display = "none";
}

function showCommentsUI() {
  const authMessage = document.getElementById("auth-message");
  if (authMessage) authMessage.style.display = "none";
  
  const commentsList = document.getElementById("comments-list");
  if (commentsList) commentsList.style.display = "block";
  
  const addForm = document.getElementById("add-form");
  if (addForm) addForm.style.display = "block";
  
  const loginContainer = document.getElementById("login-container");
  if (loginContainer) loginContainer.style.display = "none";
  
  const registerContainer = document.getElementById("register-container");
  if (registerContainer) registerContainer.style.display = "none";
}

function showLoginForm() {
  const authMessage = document.getElementById("auth-message");
  if (authMessage) authMessage.style.display = "none";
  
  const commentsList = document.getElementById("comments-list");
  if (commentsList) commentsList.style.display = "none";
  
  const addForm = document.getElementById("add-form");
  if (addForm) addForm.style.display = "none";
  
  const loginContainer = document.getElementById("login-container");
  if (loginContainer) loginContainer.style.display = "block";
  
  const registerContainer = document.getElementById("register-container");
  if (registerContainer) registerContainer.style.display = "none";
}
