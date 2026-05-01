import { registration } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { renderComments } from "./render.js";
import { showLoginForm } from "./renderLogin.js";

export function renderRegisterForm() {
  const registerContainer = document.getElementById("register-container");
  if (!registerContainer) return;

  const registerButton = document.getElementById("register-button");
  const backButton = document.getElementById("back-to-login");

  if (registerButton) {
    registerButton.addEventListener("click", async (event) => {
      event.preventDefault();
      
      const name = document.getElementById("register-name").value;
      const login = document.getElementById("register-login").value;
      const password = document.getElementById("register-password").value;

      if (!name || !login || !password) {
        alert("Пожалуйста, заполните все поля");
        return;
      }

      try {
        const userData = await registration(name, login, password);
        if (userData) {
          setCurrentUser(userData.user);
          showCommentsUI();
        }
      } catch (error) {
        alert("Ошибка регистрации: " + error.message);
      }
    });
  }

  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.preventDefault();
      showLoginForm();
    });
  }
}

export function showRegisterForm() {
  document.getElementById("auth-message").style.display = "none";
  document.getElementById("comments-list").style.display = "none";
  document.getElementById("login-container").style.display = "none";
  document.getElementById("register-container").style.display = "block";
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