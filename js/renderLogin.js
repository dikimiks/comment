import { login } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { showRegisterForm } from "./renderRegister.js";
import { init } from "./main.js";

let container = null;

function clearContainer() {
  const container = document.querySelector(".container");
  if (!container) return;
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export function renderLoginForm() {
  container = document.querySelector(".container");
  if (!container) return;
  
  clearContainer();
  
  
  const loginContainer = document.createElement("div");
  loginContainer.id = "login-container";
  loginContainer.className = "auth-container";
  
 
  const title = document.createElement("h2");
  title.className = "auth-title";
  title.textContent = "Авторизация";
  loginContainer.appendChild(title);
  
 
  const loginInput = document.createElement("input");
  loginInput.type = "text";
  loginInput.id = "login-input";
  loginInput.className = "auth-input";
  loginInput.placeholder = "Введите логин";
  loginContainer.appendChild(loginInput);
  
  
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password-input";
  passwordInput.className = "auth-input";
  passwordInput.placeholder = "Введите пароль";
  loginContainer.appendChild(passwordInput);
  
 
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "auth-buttons";
  
  const loginButton = document.createElement("button");
  loginButton.id = "login-button";
  loginButton.className = "auth-button";
  loginButton.textContent = "Войти";
  
  const registerLink = document.createElement("button");
  registerLink.id = "register-link";
  registerLink.className = "auth-button";
  registerLink.textContent = "Регистрация";
  
  buttonsDiv.appendChild(loginButton);
  buttonsDiv.appendChild(registerLink);
  loginContainer.appendChild(buttonsDiv);
  
 
  const errorElement = document.createElement("p");
  errorElement.id = "login-error";
  errorElement.className = "error-message";
  loginContainer.appendChild(errorElement);
  
  container.appendChild(loginContainer);
  
  const handleLogin = async () => {
    const loginValue = loginInput.value.trim();
    const passwordValue = passwordInput.value;
    
    if (!loginValue || !passwordValue) {
      errorElement.textContent = "Заполните все поля";
      return;
    }
    
    try {
      const userData = await login(loginValue, passwordValue);
      if (userData && userData.user) {
        setCurrentUser(userData.user);
        await init(); 
      }
    } catch (error) {
      errorElement.textContent = error.message;
    }
  };
  
  loginButton.addEventListener("click", handleLogin);
  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterForm();
  });
  
  loginInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLogin();
  });
  
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleLogin();
  });
}