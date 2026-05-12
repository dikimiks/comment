import { registration } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { renderLoginForm } from "./renderLogin.js";
import { loadComments } from "./comments.js";
import { showCommentsUI } from "./main.js";

export function showRegisterForm() {
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");

  if (loginContainer) loginContainer.style.display = "none";
  if (registerContainer) registerContainer.style.display = "block";

  const registerButton = document.getElementById("register-button");
  const backButton = document.getElementById("back-to-login");
  const nameInput = document.getElementById("register-name");
  const loginInput = document.getElementById("register-login");
  const passwordInput = document.getElementById("register-password");
  const errorElement = document.getElementById("register-error");

  const handleRegister = async () => {
    const name = nameInput?.value.trim();
    const login = loginInput?.value.trim();
    const password = passwordInput?.value;

    if (!name || !login || !password) {
      if (errorElement) errorElement.textContent = "Заполните все поля";
      return;
    }

    if (name.length < 2) {
      if (errorElement) errorElement.textContent = "Имя должно быть не короче 2 символов";
      return;
    }

    if (password.length < 6) {
      if (errorElement) errorElement.textContent = "Пароль должен быть не короче 6 символов";
      return;
    }

    try {
      const userData = await registration(name, login, password);
      if (userData && userData.user) {
        setCurrentUser(userData.user);
        await loadComments();
        showCommentsUI();
        
        const userNameInput = document.getElementById("name-input");
        if (userNameInput) userNameInput.value = userData.user.name;
      }
    } catch (error) {
      if (errorElement) errorElement.textContent = error.message;
    }
  };

  if (registerButton) {
    registerButton.removeEventListener("click", handleRegister);
    registerButton.addEventListener("click", handleRegister);
  }

  if (backButton) {
    backButton.removeEventListener("click", () => {});
    backButton.addEventListener("click", (e) => {
      e.preventDefault();
      renderLoginForm();
    });
  }
}