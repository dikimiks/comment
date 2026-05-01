import { login } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { showRegisterForm } from "./renderRegister.js";
import { renderComments } from "./render.js";

export function renderLogin() {
  const loginContainer = document.getElementById("login-container");
  if (!loginContainer) return;

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
  document.getElementById("auth-message").style.display = "none";
  document.getElementById("comments-list").style.display = "none";
  document.getElementById("login-container").style.display = "block";
  document.getElementById("register-container").style.display = "none";
  document.getElementById("add-form").style.display = "none";
}

function showCommentsUI() {
  document.getElementById("auth-message").style.display = "none";
  document.getElementById("login-container").style.display = "none";
  document.getElementById("register-container").style.display = "none";
  document.getElementById("comments-list").style.display = "block";
  document.getElementById("add-form").style.display = "block";
  renderComments();
}
