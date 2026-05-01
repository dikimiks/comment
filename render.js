import { comments } from "./comments.js";

export function renderComments() {
  const commentsList = document.getElementById("comments-list");
  if (!commentsList) {
    console.error("comments-list не найден");
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
        </li>
      `
    )
    .join("");
}
