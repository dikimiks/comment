import { registration } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { renderComments } from "./render.js";
import { showLoginForm } from "./renderLogin.js";

export function renderRegisterForm() {
  const container = document.querySelector(".container");
  const registerHTML = `
    <div class="auth-container" id="register-container">
      <h2 class="auth-title">Регистрация</h2>
      <input type="text" class="auth-input" id="register-name" placeholder="Введите имя" />
      <input type="text" class="auth-input" id="register-login" placeholder="Введите логин" />
      <input type="password" class="auth-input" id="register-password" placeholder="Введите пароль" />
      <div class="auth-buttons">
        <button class="auth-button" id="register-button">Зарегистрироваться</button>
        <button class="auth-button" id="back-to-login">Назад</button>
      </div>
      <p id="auth-error" class="error-message"></p>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", registerHTML);

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
          setCurrentUser(userData.user); // Сохраняем данные пользователя
          renderComments(); // Переходим к ленте комментариев
        }
      } catch (error) {
        alert("Ошибка регистрации: " + error.message);
      }
    });
  }

  if (backButton) {
    backButton.addEventListener("click", (event) => {
      event.preventDefault();
      showLoginForm(); // Возвращаемся к форме входа
    });
  }
}

export function showRegisterForm() {
  const authMessage = document.getElementById("auth-message");
  const commentsList = document.getElementById("comments-list");
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");

  if (authMessage) authMessage.style.display = "none";
  if (commentsList) commentsList.style.display = "none";
  if (loginContainer) loginContainer.style.display = "none";
  if (registerContainer) registerContainer.style.display = "block";
}