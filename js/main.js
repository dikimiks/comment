import { renderComments } from "./render.js";
import { loadComments } from "./comments.js";
import { checkAuth } from "./auth.js";
import { renderLogin, showLoginForm } from "./renderLogin.js";
import { renderRegisterForm, showRegisterForm } from "./renderRegister.js";

document.addEventListener("DOMContentLoaded", async () => {
  const authMessage = document.getElementById("auth-message");
  const authLink = document.getElementById("auth-link");
  const commentsList = document.getElementById("comments-list");
  const addForm = document.getElementById("add-form");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");



  await loadComments();
  renderComments();
  renderLogin(); 
  renderRegisterForm(); 

  if (checkAuth()) {
    showCommentsUI();
  } else {
    showAuthMessage();
  }

  if (authLink) {
    authLink.addEventListener("click", (event) => {
      event.preventDefault();
      showLoginForm();
    });
  }

  const registerLink = document.getElementById("register-link");
  if (registerLink) {
    registerLink.addEventListener("click", (event) => {
      event.preventDefault();
      showRegisterForm();
    });
  }
});

// Функция для отображения сообщения о необходимости авторизации
function showAuthMessage() {
  const authMessage = document.getElementById("auth-message");
  const commentsList = document.getElementById("comments-list");
  const addForm = document.getElementById("add-form");
  const registerContainer = document.getElementById("register-container");

  if (authMessage) authMessage.style.display = "block";
  if (commentsList) commentsList.style.display = "block";
  if (addForm) addForm.style.display = "none";
  if (registerContainer) registerContainer.style.display = "none";
}

// Функция для отображения интерфейса комментариев
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