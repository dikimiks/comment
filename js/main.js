import { loadComments } from "./comments.js";
import { renderComments } from "./render.js";
import { checkAuth, getCurrentUser } from "./auth.js";
import { renderLoginForm } from "./renderLogin.js";
import { renderAddForm } from "./renderAddForm.js";

let container = null;
let loadingMessage = null;

function initContainer() {
  container = document.querySelector(".container");
  if (!container) {
    console.error("Container not found");
    return false;
  }
  return true;
}

function showLoading() {
  loadingMessage = document.createElement("p");
  loadingMessage.id = "loading-message";
  loadingMessage.textContent = "Загрузка комментариев...";
  container.appendChild(loadingMessage);
}

function hideLoading() {
  if (loadingMessage && loadingMessage.parentNode) {
    loadingMessage.remove();
  }
}

function clearContainer() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export function showCommentsUI() {
  if (!container) return;
  
  clearContainer();

  const commentsList = document.createElement("ul");
  commentsList.id = "comments-list";
  commentsList.className = "comments";
  container.appendChild(commentsList);
  
  
  renderComments();
  
 
  renderAddForm();
}

function showAuthMessage() {
  if (!container) return;
  
  clearContainer();
  
  
  const commentsList = document.createElement("ul");
  commentsList.id = "comments-list";
  commentsList.className = "comments";
  container.appendChild(commentsList);
  
  
  renderComments();
  
 
  const authMessage = document.createElement("p");
  authMessage.id = "auth-message";
  authMessage.style.display = "block";
  authMessage.style.marginTop = "20px";
  authMessage.style.textAlign = "center";
  
  const authLink = document.createElement("a");
  authLink.href = "#";
  authLink.id = "auth-link";
  authLink.className = "link-login";
  authLink.textContent = "авторизуйтесь";
  
  authMessage.appendChild(document.createTextNode("Чтобы добавить комментарий, "));
  authMessage.appendChild(authLink);
  
  container.appendChild(authMessage);
  
 
  authLink.addEventListener("click", (event) => {
    event.preventDefault();
    renderLoginForm();
  });
}

export async function init() {
  if (!initContainer()) return;
  
  showLoading();
  
  await loadComments();
  
  hideLoading();
  
  if (checkAuth()) {
    showCommentsUI();
  } else {
    showAuthMessage();
  }
}


document.addEventListener("DOMContentLoaded", init);