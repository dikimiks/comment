import { renderComments } from "./render.js";
import { loadComments, comments } from "./comments.js";
import { checkAuth } from "./auth.js";
import { showLoginForm, showRegisterForm } from "./render.js";

document.addEventListener("DOMContentLoaded", async () => {
  const authMessage = document.getElementById("auth-message");
  const authLink = document.getElementById("auth-link");
  const commentsContainer = document.getElementById("comments-container");
  const addForm = document.getElementById("add-form");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");

  await loadComments();
  renderComments();

  if (checkAuth()) {
    showCommentsUI();
  } else {
    showAuthMessage();
  }

  function showCommentsUI() {
    if (!authMessage || !commentsContainer || !addForm || !loginContainer || !registerContainer) {
      console.error("Ошибка: один из элементов не найден!");
      return;
    }
    authMessage.style.display = "none";
    loginContainer.style.display = "none";
    registerContainer.style.display = "none";
    commentsContainer.style.display = "block";
    addForm.style.display = "block";
  }

  function showAuthMessage() {
    if (!authMessage || !commentsContainer || !addForm || !loginContainer || !registerContainer) {
      console.error("Ошибка: один из элементов не найден!");
      return;
    }
    authMessage.style.display = "block";
    commentsContainer.style.display = "block";
    addForm.style.display = "none";
    loginContainer.style.display = "none";
    registerContainer.style.display = "none";
  }

  if (authLink) {
    authLink.addEventListener("click", (event) => {
      event.preventDefault();
      showLoginForm();
    });
  } else {
    console.error("Ошибка: auth-link не найден!");
  }
});
  authLink.addEventListener("click", (event) => {
    event.preventDefault();
    showLoginForm();
  });

  registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    showRegisterForm();
  });
