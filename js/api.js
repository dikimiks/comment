import { logout } from "./auth.js";


const PERSONAL_KEY = "polina-rebrova";
const API_URL = `https://wedev-api.sky.pro/api/v2/${PERSONAL_KEY}/comments`;
const USER_API_URL = "https://wedev-api.sky.pro/api/user";


async function handleUnauthorized(response) {
  if (response.status === 401) {
    logout();
    alert("Сессия истекла. Пожалуйста, войдите снова.");
    window.location.reload();
    throw new Error("Неавторизован");
  }
  return response;
}

async function checkResponse(response) {
  const contentType = response.headers.get("content-type");
  

  if (contentType && contentType.includes("text/html")) {
    console.error("Сервер вернул HTML вместо JSON. URL:", response.url);
    throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
  }
  
  return response;
}

export async function fetchComments() {
  try {
    console.log("Запрос к API:", API_URL);
    
    const response = await fetch(API_URL);
    await checkResponse(response);
    await handleUnauthorized(response);
    
    if (!response.ok) throw new Error(`Ошибка загрузки комментариев: ${response.status}`);
    
    const data = await response.json();
    
    if (!data.comments || !Array.isArray(data.comments)) {
      throw new Error("Неверный формат ответа от сервера");
    }
    
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
      },
      body: JSON.stringify({ text }),
    });

    await checkResponse(response);
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
      },
    });

    await checkResponse(response);
    await handleUnauthorized(response);

    if (!response.ok) throw new Error("Ошибка переключения лайка");
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Ошибка лайка:", error);
    throw error;
  }
}
export async function registration(name, login, password) {
  const response = await fetch(USER_API_URL, { 
    method: "POST",
    body: JSON.stringify({ name, login, password }),
  });
  
  await checkResponse(response);
  
  if (response.status === 400) {
    const error = await response.json();
    throw new Error(error.error || "Пользователь с таким логином уже существует");
  }
  
  if (!response.ok) {
    throw new Error("Ошибка регистрации");
  }
  
  return response.json();
}