import { registration } from "./api.js";
import { setCurrentUser } from "./auth.js";
import { renderLoginForm } from "./renderLogin.js";
import { init } from "./main.js";

function clearContainer() {
  const container = document.querySelector(".container");
  if (!container) return;
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export function showRegisterForm() {
  const container = document.querySelector(".container");
  if (!container) return;
  
  clearContainer();
  

  const registerContainer = document.createElement("div");
  registerContainer.id = "register-container";
  registerContainer.className = "auth-container";
  
  const title = document.createElement("h2");
  title.className = "auth-title";
  title.textContent = "Регистрация";
  registerContainer.appendChild(title);
  

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "register-name";
  nameInput.className = "auth-input";
  nameInput.placeholder = "Введите имя";
  registerContainer.appendChild(nameInput);
  
 
  const loginInput = document.createElement("input");
  loginInput.type = "text";
  loginInput.id = "register-login";
  loginInput.className = "auth-input";
  loginInput.placeholder = "Введите логин";
  registerContainer.appendChild(loginInput);
  
 
  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "register-password";
  passwordInput.className = "auth-input";
  passwordInput.placeholder = "Введите пароль";
  registerContainer.appendChild(passwordInput);
  
 
  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "auth-buttons";
  
  const registerButton = document.createElement("button");
  registerButton.id = "register-button";
  registerButton.className = "auth-button";
  registerButton.textContent = "Зарегистрироваться";
  
  const backButton = document.createElement("button");
  backButton.id = "back-to-login";
  backButton.className = "auth-button";
  backButton.textContent = "Назад";
  
  buttonsDiv.appendChild(registerButton);
  buttonsDiv.appendChild(backButton);
  registerContainer.appendChild(buttonsDiv);
  
  const errorElement = document.createElement("p");
  errorElement.id = "register-error";
  errorElement.className = "error-message";
  registerContainer.appendChild(errorElement);
  
  container.appendChild(registerContainer);
  
  const handleRegister = async () => {
    const name = nameInput.value.trim();
    const login = loginInput.value.trim();
    const password = passwordInput.value;
    
    if (!name || !login || !password) {
      errorElement.textContent = "Заполните все поля";
      return;
    }
    
    if (name.length < 2) {
      errorElement.textContent = "Имя должно быть не короче 2 символов";
      return;
    }
    
    if (password.length < 6) {
      errorElement.textContent = "Пароль должен быть не короче 6 символов";
      return;
    }
    
    try {
      const userData = await registration(name, login, password);
      if (userData && userData.user) {
        setCurrentUser(userData.user);
        await init(); 
      }
    } catch (error) {
      errorElement.textContent = error.message;
    }
  };
  
  registerButton.addEventListener("click", handleRegister);
  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    renderLoginForm();
  });
}