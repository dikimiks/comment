import { addComment, toggleLike, comments } from "./comments.js";
import { renderComments } from "./render.js";
import { sanitize } from "./sanitize.js";

export function addEventListeners() {
  const addButton = document.getElementById("add-comment-button");
  const nameInput = document.getElementById("name-input");
  const commentInput = document.getElementById("comment-input");

  if (!addButton || !nameInput || !commentInput) {
    console.error("Ошибка: один из элементов формы не найден!");
    return;
  }

  addButton.addEventListener("click", () => {
    if (nameInput.value.trim() && commentInput.value.trim()) {
      addComment(sanitize(nameInput.value), sanitize(commentInput.value));
      nameInput.value = "";
      commentInput.value = "";
      renderComments();
    }
  });

  addLikeEventListeners();
  addReplyListeners(); 
}

export function addLikeEventListeners() {
  document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const commentIndex = event.target.dataset.index;
      toggleLike(commentIndex);
      renderComments();
    });
  });
}

export function addReplyListeners() {
  document.querySelectorAll(".comment").forEach((comment) => {
    comment.addEventListener("click", (event) => {
      if (event.target.classList.contains("like-button")) return;
      const index = event.currentTarget.dataset.index;
      const textInput = document.getElementById("comment-input");

      if (comments[index]) {
        textInput.value = `> ${comments[index].text}\n`;
      }
    });
  });
}

