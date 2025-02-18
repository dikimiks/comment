import { comments } from "./comments.js";
import { addLikeEventListeners, addReplyListeners } from "./eventHandlers.js";

export function renderComments() {
  const commentsList = document.getElementById("comments-list");

  if (!commentsList) {
    console.error("Ошибка: элемент #comments-list не найден!");
    return;
  }

  commentsList.innerHTML = comments
    .map(
      (comment, index) => `
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
              <button class="like-button ${
                comment.isLiked ? "-active-like" : ""
              }" data-index="${index}"></button>
            </div>
          </div>
        </li>
      `
    )
    .join("");

  addLikeEventListeners(); 
  addReplyListeners(); 
}

