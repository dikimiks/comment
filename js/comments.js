import { fetchComments, postComment, toggleLike } from "./api.js";
import { renderComments } from "./render.js";
import { getCurrentUser } from "./auth.js";

export let comments = [];

export async function loadComments() {
  const loadingMessage = document.getElementById("loading-message");
  if (loadingMessage) loadingMessage.style.display = "block";

  try {
    comments = await fetchComments();
    renderComments();
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
    if (loadingMessage) loadingMessage.textContent = "Ошибка загрузки комментариев";
  } finally {
    if (loadingMessage) loadingMessage.style.display = "none";
  }
}

export async function addComment(text) {
  const user = getCurrentUser();
  if (!user) {
    alert("Сначала авторизуйтесь!");
    return false;
  }

  if (text.length < 3) {
    alert("Комментарий должен быть не короче 3 символов");
    return false;
  }

  const addForm = document.getElementById("add-form");
  const commentLoadingMessage = document.getElementById("comment-loading-message");
  const addButton = document.getElementById("add-comment-button");
  const commentInput = document.getElementById("comment-input");

  if (addForm) addForm.style.display = "none";
  if (commentLoadingMessage) commentLoadingMessage.style.display = "block";
  if (addButton) addButton.disabled = true;

  try {
    await postComment(text);
    await loadComments();
    if (commentInput) commentInput.value = "";
    return true;
  } catch (error) {
    alert(error.message || "Ошибка добавления комментария");
    return false;
  } finally {
    if (addForm) addForm.style.display = "block";
    if (commentLoadingMessage) commentLoadingMessage.style.display = "none";
    if (addButton) addButton.disabled = false;
  }
}

export async function handleToggleLike(commentId, index) {
  const user = getCurrentUser();
  if (!user) {
    alert("Авторизуйтесь, чтобы ставить лайки!");
    return;
  }

  try {
    const result = await toggleLike(commentId);
    if (result) {
      comments[index].likes = result.likes;
      comments[index].isLiked = result.isLiked;
      renderComments();
    }
  } catch (error) {
    console.error("Ошибка при установке лайка:", error);
    alert("Ошибка при установке лайка");
  }
}