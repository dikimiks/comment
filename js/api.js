const PERSONAL_KEY = "polina-rebrova"; 
const API_URL = `https://wedev-api.sky.pro/api/v1/${PERSONAL_KEY}/comments`;


export async function fetchComments() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Ошибка загрузки комментариев");
    }
    const data = await response.json();

    return data.comments.map((comment) => ({
      author: comment.author.name,
      text: comment.text,
      date: new Date(comment.date).toLocaleString("ru-RU"),
      likes: comment.likes,
      isLiked: comment.isLiked,
    }));
  } catch (error) {
    if (!navigator.onLine) {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    } else {
      alert("Сервер сломался, попробуй позже");
    }
    console.error("Ошибка при получении комментариев:", error);
    return [];
  }
}


export async function postComment(author, text) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ name: author, text, forceError: true }), 
    });

    if (response.status === 400) {
      alert("Имя и комментарий должны быть не короче 3 символов");
      throw new Error("Ошибка 400: неверные данные");
    }

    if (response.status === 500) {
      alert("Сервер сломался, попробуй позже");
      throw new Error("Ошибка 500: сервер сломан");
    }

    if (!response.ok) {
      throw new Error("Ошибка при добавлении комментария");
    }

    return { author, text, date: new Date().toLocaleString("ru-RU"), likes: 0, isLiked: false };
  } catch (error) {
    if (!navigator.onLine) {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    }
    console.error("Ошибка при добавлении комментария:", error);
    return null;
  }
}

