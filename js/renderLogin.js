import { login } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { showRegisterForm } from "./renderRegister.js";
import { renderComments } from "./render.js";

export function renderLogin() {
  const loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const loginUser = document.getElementById("login-input").value;
      const passwordUser = document.getElementById("password-input").value;
      try {
        const userData = await login(loginUser, passwordUser);
        if (userData) {
          setCurrentUser(userData.user);
          showCommentsUI();
        }
      } catch (error) {
        alert("Ошибка авторизации: " + error.message);
      }
    });
  }

  const registerLink = document.getElementById("register-link");
  if (registerLink) {
    registerLink.addEventListener("click", (event) => {
      event.preventDefault();
      showRegisterForm();
    });
  }
}

export function showLoginForm() {
  const authMessage = document.getElementById("auth-message");
  const commentsList = document.getElementById("comments-list");
  const addForm = document.getElementById("add-form");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");
  
  if (authMessage) authMessage.style.display = "none";
  if (commentsList) commentsList.style.display = "none";
  if (addForm) addForm.style.display = "none";
  if (loginContainer) loginContainer.style.display = "block";
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
  
  renderComments();}