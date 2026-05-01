import { renderComments } from "./render.js";
import { loadComments } from "./comments.js";
import { checkAuth } from "./auth.js";
import { renderLogin, showLoginForm } from "./renderLogin.js";
import { renderRegisterForm } from "./renderRegister.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComments();
  renderComments();
  renderLogin();
  renderRegisterForm();

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

function showCommentsUI() {
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
}