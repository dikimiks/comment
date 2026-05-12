import { logout } from "./auth.js";

const PERSONAL_KEY = "polina-rebrova";
const API_URL = `https://wedev-api.sky.pro/api/v2/${PERSONAL_KEY}/comments`;
const AUTH_URL = "https://wedev-api.sky.pro/api/v2/user";

async function handleUnauthorized(response) {
  if (response.status === 401) {
    logout();
    alert("Сессия истекла. Пожалуйста, войдите снова.");
    window.location.reload();
    throw new Error("Неавторизован");
  }
  return response;
}

export async function fetchComments() {
  try {
    const response = await fetch(API_URL);
    await handleUnauthorized(response);
    
    if (!response.ok) throw new Error("Ошибка загрузки комментариев");

    const data = await response.json();
    return data.comments.map((comment) => ({
      id: comment.id,
      author: comment.author.name,
      authorLogin: comment.author.login,
      text: comment.text,
      date: comment.date,
      likes: comment.likes,
      isLiked: comment.isLiked || false,
    }));
  } catch (error) {
    console.error("Ошибка загрузки комментариев:", error);
    throw error;
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

    await handleUnauthorized(response);

    if (response.status === 400) {
      const error = await response.json();
      throw new Error(error.error || "Ошибка валидации");
    }

    if (!response.ok) throw new Error("Ошибка добавления комментария");
    
    return await response.json();
  } catch (error) {
    console.error("Ошибка добавления комментария:", error);
    throw error;
  }
}

export async function toggleLike(commentId) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Нет авторизации");
  
  try {
    const response = await fetch(`${API_URL}/${commentId}/toggle-like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    await handleUnauthorized(response);

    if (!response.ok) throw new Error("Ошибка переключения лайка");
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Ошибка лайка:", error);
    throw error;
  }
}

export async function login(login, password) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Ошибка авторизации");
  }
  
  return response.json();
}

export async function registration(name, login, password) {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, login, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Ошибка регистрации");
  }
  
  return response.json();
}