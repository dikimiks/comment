

document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("auth-link");

  authLink.addEventListener("click", (event) => {
    event.preventDefault();
    const loginContainer = document.getElementById("login-container");
    loginContainer.style.display = "block";
  });
});


export function addEventListeners() {
  const addButton = document.getElementById("add-comment-button");
  const commentInput = document.getElementById("comment-input");

  if (!addButton || !commentInput) {
    console.error("Ошибка: один из элементов формы не найден!");
    return;
  }

  addButton.addEventListener("click", () => {
    if (commentInput.value.trim()) {
      addComment(commentInput.value.trim());
      commentInput.value = "";
      renderComments();
    }
  });
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
