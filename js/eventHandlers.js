import { addComment, toggleLike } from "./comments.js";
import { renderComments } from "./render.js";

export function initEventHandlers() {
  initAddCommentHandler();
}


export function initAddCommentHandler() {
  const addButton = document.getElementById("add-comment-button");
  const commentInput = document.getElementById("comment-input");

  if (!addButton || !commentInput) {
    console.error("Ошибка: элементы формы не найдены!");
    return;
  }


  const newAddButton = addButton.cloneNode(true);
  addButton.parentNode.replaceChild(newAddButton, addButton);

  newAddButton.addEventListener("click", async () => {
    const text = commentInput.value.trim();
    if (text) {
      await addComment(text);
      commentInput.value = "";
    
    } else {
      alert("Введите текст комментария");
    }
  });
}


export function initLikeHandlers() {
 
  console.log("Like handlers are now in render.js");
}

export function initReplyHandlers() {

  console.log("Reply handlers are now in render.js");
}