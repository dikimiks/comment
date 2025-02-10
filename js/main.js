import { renderComments } from "./render.js";
import { loadComments } from "./comments.js";
import { checkAuth } from "./auth.js";
import { showLoginForm, showRegisterForm, showAuthMessage, showCommentsUI } from "./render.js";


function initEventListeners() {
  const authLink = document.getElementById("auth-link");
  const registerLink = document.getElementById("register-link");

  authLink.addEventListener("click", (event) => {
    event.preventDefault();
    showLoginForm();
  });

  registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    showRegisterForm();
  });
}


document.addEventListener("DOMContentLoaded", async () => {
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

 
  initEventListeners();
});
