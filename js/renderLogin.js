import { login } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { showRegisterForm } from "./renderRegister.js";
import { loadComments } from "./comments.js";
import { showCommentsUI } from "./main.js";

export function renderLoginForm() {
  const loginContainer = document.getElementById("login-container");
  const registerContainer = document.getElementById("register-container");
  const authMessage = document.getElementById("auth-message");
  const commentsList = document.getElementById("comments-list");
  const addForm = document.getElementById("add-form");

  if (authMessage) authMessage.style.display = "none";
  if (commentsList) commentsList.style.display = "none";
  if (addForm) addForm.style.display = "none";
  if (loginContainer) loginContainer.style.display = "block";
  if (registerContainer) registerContainer.style.display = "none";

  const loginButton = document.getElementById("login-button");
  const registerLink = document.getElementById("register-link");
  const loginInput = document.getElementById("login-input");
  const passwordInput = document.getElementById("password-input");
  const errorElement = document.getElementById("login-error");

  const newLoginButton = loginButton.cloneNode(true);
  const newRegisterLink = registerLink.cloneNode(true);
  
  if (loginButton && loginButton.parentNode) {
    loginButton.parentNode.replaceChild(newLoginButton, loginButton);
  }
  if (registerLink && registerLink.parentNode) {
    registerLink.parentNode.replaceChild(newRegisterLink, registerLink);
  }

  const handleLogin = async () => {
    const loginValue = loginInput?.value.trim();
    const passwordValue = passwordInput?.value;

    if (!loginValue || !passwordValue) {
      if (errorElement) errorElement.textContent = "Заполните все поля";
      return;
    }

    try {
      const userData = await login(loginValue, passwordValue);
      if (userData && userData.user) {
        setCurrentUser(userData.user);
        await loadComments();
        showCommentsUI();
        
        const nameInput = document.getElementById("name-input");
        if (nameInput) nameInput.value = userData.user.name;
      }
    } catch (error) {
      if (errorElement) errorElement.textContent = error.message;
    }
  };

  newLoginButton.addEventListener("click", handleLogin);
  newRegisterLink.addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterForm();
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };
  
  if (loginInput) loginInput.addEventListener("keypress", handleKeyPress);
  if (passwordInput) passwordInput.addEventListener("keypress", handleKeyPress);
}