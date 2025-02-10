import { comments } from "./comments.js";
import { addLikeEventListeners, addReplyListeners } from "./eventHandlers.js";
import { getCurrentUser } from "./auth.js";

export function renderComments() {
  const commentsList = document.getElementById("comments-list");

  if (!commentsList) {
    console.error("Ошибка: элемент #comments-list не найден!");
    return;
  }

  commentsList.innerHTML = comments
    .map((comment, index) => `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div class="comment-author">${comment.author}</div>
            <div class="comment-date">${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
            </div>
          </div>
        </li>
      `)
    .join("");

  addLikeEventListeners();
  addReplyListeners();
  renderCommentForm();
}

export function renderCommentForm() {
  const container = document.querySelector(".container");
  const user = getCurrentUser();
  const formContainer = document.getElementById("comment-form-container");

  if (formContainer) {
    formContainer.remove();
  }

  const formHtml = user
    ? `
      <div class="add-form" id="comment-form-container">
        <input type="text" class="add-form-name" value="${user.name}" readonly />
        <textarea class="add-form-text" id="comment-input" placeholder="Введите ваш комментарий" rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-comment-button">Написать</button>
        </div>
      </div>
      <p id="comment-loading-message" style="display: none">Комментарий добавляется...</p> 
    `
    : `<p id="comment-form-container" class="login-message">Чтобы добавить комментарий, <a href="#" id="login-link">авторизуйтесь</a></p>`;

  container.insertAdjacentHTML("beforeend", formHtml);

  if (!user) {
    document.getElementById("login-link").addEventListener("click", (event) => {
      event.preventDefault();
      showLoginForm();
    });
  }
}


export function showLoginForm() {
  document.getElementById("auth-message").style.display = "none";
  document.getElementById("comments-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
  document.getElementById("register-container").style.display = "none";
}

export function showRegisterForm() {
  document.getElementById("auth-message").style.display = "none";
  document.getElementById("comments-container").style.display = "none";
  document.getElementById("login-container").style.display = "none";
  document.getElementById("register-container").style.display = "block";
}