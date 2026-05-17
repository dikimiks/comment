import { comments, handleToggleLike } from "./comments.js";
import { sanitize, formatDate } from "./utils.js";

export function renderComments() {
  const commentsList = document.getElementById("comments-list");
  if (!commentsList) {
    console.error("comments-list не найден");
    return;
  }

  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  if (comments.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "comment";
    emptyMessage.textContent = "Комментариев пока нет";
    commentsList.appendChild(emptyMessage);
    return;
  }

  comments.forEach((comment, index) => {
    const commentItem = createCommentElement(comment, index);
    commentsList.appendChild(commentItem);
  });
}

function createCommentElement(comment, index) {
  const li = document.createElement("li");
  li.className = "comment";
  li.dataset.index = index;

 
  const header = document.createElement("div");
  header.className = "comment-header";

  const author = document.createElement("div");
  author.className = "comment-author";
  author.textContent = sanitize(comment.author);

  const date = document.createElement("div");
  date.className = "comment-date";
  date.textContent = formatDate(comment.date);

  header.appendChild(author);
  header.appendChild(date);


  const body = document.createElement("div");
  body.className = "comment-body";

  const text = document.createElement("div");
  text.className = "comment-text";
  text.textContent = sanitize(comment.text);

  body.appendChild(text);

 
  const footer = document.createElement("div");
  footer.className = "comment-footer";

  const likesContainer = document.createElement("div");
  likesContainer.className = "likes";

  const likesCounter = document.createElement("span");
  likesCounter.className = "likes-counter";
  likesCounter.textContent = comment.likes;

  const likeButton = document.createElement("button");
  likeButton.className = "like-button";
  if (comment.isLiked) {
    likeButton.classList.add("liked");
  }
  likeButton.dataset.id = comment.id;
  likeButton.dataset.index = index;

  likeButton.addEventListener("click", async (event) => {
    event.stopPropagation();
    await handleToggleLike(comment.id, index);
  });

  likesContainer.appendChild(likesCounter);
  likesContainer.appendChild(likeButton);
  footer.appendChild(likesContainer);

  li.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) return;
    const commentInput = document.getElementById("comment-input");
    if (commentInput) {
      commentInput.value = `> ${comment.text}\n\n`;
      commentInput.focus();
    }
  });

  li.appendChild(header);
  li.appendChild(body);
  li.appendChild(footer);

  return li;
}