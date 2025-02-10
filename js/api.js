const PERSONAL_KEY = "polina-rebrova";
const API_URL = `https://wedev-api.sky.pro/api/v2/${PERSONAL_KEY}/comments`;
const AUTH_URL = "https://wedev-api.sky.pro/api/v2//user";

export async function fetchComments() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Ошибка загрузки комментариев");

    const data = await response.json();
    return data.comments.map((comment) => ({
      author: comment.author.name,
      text: comment.text,
      date: new Date(comment.date).toLocaleString("ru-RU"),
      likes: comment.likes,
      isLiked: comment.isLiked,
    }));
  } catch (error) {
    alert("Ошибка загрузки комментариев");
    return [];
  }
}

export async function postComment(text) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Нет авторизации");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) throw new Error("Ошибка добавления комментария");
    return await fetchComments();
  } catch (error) {
    alert("Ошибка добавления комментария");
    return [];
  }
}

export async function login(login, password) {
  return fetch(AUTH_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
}

export async function registration(name, login, password) {
  return fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, login, password }),
  });
}