import { loadComments } from "./comments.js";
import { checkAuth } from "./auth.js";
import { renderLogin } from "./renderLogin.js";
import { renderRegisterForm } from "./renderRegister.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadComments();


  renderComments();


  renderLogin();
  renderRegisterForm();

  if (checkAuth()) {
    showCommentsUI();
  } else {
    showAuthMessage();
  }

 
  const authLink = document.getElementById("auth-link");
  if (authLink) {
    authLink.addEventListener("click", (event) => {
      event.preventDefault();
      showLoginForm();
    });
  }
});

function showAuthMessage() {
  document.getElementById("auth-message").style.display = "block";
  document.getElementById("comments-list").style.display = "block";
  document.getElementById("add-form").style.display = "none";
  document.getElementById("login-container").style.display = "none";
  document.getElementById("register-container").style.display = "none";
}
