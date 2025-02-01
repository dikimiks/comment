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
  const apiComments = await fetchComments();
  comments = [...comments, ...apiComments];
}


export async function addComment(author, text) {
  const newComment = await postComment(author, text);
  if (newComment) {
    await loadComments();
    renderComments(); 
  }
}


export function toggleLike(index) {
  const comment = comments[index];
  if (comment) {
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }
}


