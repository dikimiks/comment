export const comments = [
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

export function addComment(author, text) {
  comments.push({
    author,
    text,
    date: new Date().toLocaleString("ru-RU"),
    likes: 0,
    isLiked: false,
  });
}

export function toggleLike(index) {
  const comment = comments[index];
  if (comment) {
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }
}

  