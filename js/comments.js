import { fetchComments, postComment } from "./api.js";
import { renderComments } from "./render.js";
import { getCurrentUser } from "./auth.js";

export let comments = [
  {
    author: "Глеб Фокин",
    text: "Это будет первый комментарий на этой странице",
    date: "12.02.22 12:18",
    likes: 3,
    isLiked: false,
  },
  {
    author: "Варвара Н.",
    text: "Мне нравится как оформлена эта страница! ❤",
    date: "13.02.22 19:22",
    likes: 75,
    isLiked: true,
  },
];


export async function loadComments() {
  const loadingMessage = document.getElementById("loading-message");
  loadingMessage.style.display = "block";

  try {
    comments = await fetchComments();
    renderComments();
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
    loadingMessage.textContent = "Ошибка загрузки комментариев";
  } finally {
    loadingMessage.style.display = "none";
  }
}


export async function addComment(text) {
  const user = getCurrentUser();
  if (!user) {
    alert("Сначала авторизуйтесь!");
    return;
  }

  if (text.length < 3) {
    alert("Комментарий должен быть не короче 3 символов");
    return;
  }

  const addForm = document.getElementById("add-form");
  const commentLoadingMessage = document.getElementById("comment-loading-message");
  const addButton = document.getElementById("add-comment-button");

  addForm.style.display = "none";
  commentLoadingMessage.style.display = "block";
  addButton.disabled = true;

  try {
    await postComment(text);
    await loadComments();
  } finally {
    addForm.style.display = "block";
    commentLoadingMessage.style.display = "none";
    addButton.disabled = false;
  }
}


export function toggleLike(index) {
  if (!comments[index]) return;

  comments[index].isLiked = !comments[index].isLiked;
  comments[index].likes += comments[index].isLiked ? 1 : -1;
  renderComments();
}