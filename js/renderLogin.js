import { login } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { showRegisterForm } from "./renderRegister.js";
import { renderComments } from "./render.js"; // Импортируем функцию для отрисовки комментариев

export const renderLogin = () => {
  const container = document.querySelector(".container");
  const elemLoginHTML = `
    <div class="auth-container" id="login-container">
      <h2 class="auth-title">Авторизация</h2>
      <input type="text" class="auth-input" id="login-input" placeholder="Введите логин" />
      <input type="password" class="auth-input" id="password-input" placeholder="Введите пароль" />
      <div class="auth-buttons">
        <button class="auth-button" id="login-button">Войти</button>
        <button class="auth-button" id="register-link">Регистрация</button>
      </div>
      <p id="auth-error" class="error-message"></p>
    </div>
  `;
  container.innerHTML = elemLoginHTML;

  const loginButton = document.getElementById("login-button");
  if (loginButton) {
    loginButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const loginUser = document.getElementById("login-input").value;
      const passwordUser = document.getElementById("password-input").value;

      try {
        const userData = await login(loginUser, passwordUser);
        if (userData) {
          setCurrentUser(userData.user); // Сохраняем данные пользователя
          renderComments(); // Переходим к ленте комментариев
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
      showRegisterForm(); // Переход к форме регистрации
    });
  }
};

export function showLoginForm() {
  const authMessage = document.getElementById("auth-message");
  const commentsList = document.getElementById("comments-list");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");

  if (authMessage) authMessage.style.display = "none";
  if (commentsList) commentsList.style.display = "none";
  if (loginContainer) loginContainer.style.display = "block";
  if (registerContainer) registerContainer.style.display = "none";
}