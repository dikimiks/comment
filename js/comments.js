import { fetchComments, postComment } from "./api.js";
import { renderComments } from "./render.js";

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
    const apiComments = await fetchComments();
    comments = [...comments, ...apiComments];
    renderComments();
  } catch (error) {
    console.error("Ошибка при загрузке комментариев:", error);
    loadingMessage.textContent = "Ошибка загрузки комментариев";
  } finally {
    loadingMessage.style.display = "none"; 
  }
}


export async function addComment(author, text) {
  if (author.length < 3 || text.length < 3) {
    alert("Имя и комментарий должны быть не короче 3 символов");
    return;
  }

  const addForm = document.getElementById("add-form");
  const commentLoadingMessage = document.getElementById("comment-loading-message");
  const addButton = document.getElementById("add-comment-button");

  addForm.style.display = "none"; 
  commentLoadingMessage.style.display = "block"; 
  addButton.disabled = true; 

  try {
    const newComment = await postComment(author, text);
    if (newComment) {
      await loadComments(); 
    }
  } finally {
    addForm.style.display = "block"; 
    commentLoadingMessage.style.display = "none"; 
    addButton.disabled = false; 
  }
}


export function toggleLike(index) {
  const comment = comments[index];
  if (comment) {
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }
}


