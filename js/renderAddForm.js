import { addComment } from "./comments.js";
import { getCurrentUser } from "./auth.js";

export function renderAddForm() {
  const container = document.querySelector(".container");
  if (!container) return;
  
  const user = getCurrentUser();
  if (!user) return;
  

  if (document.getElementById("add-form")) return;
  
  const addForm = document.createElement("div");
  addForm.id = "add-form";
  addForm.className = "add-form";
  

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name-input";
  nameInput.className = "add-form-name";
  nameInput.value = user.name;
  nameInput.readOnly = true;
  addForm.appendChild(nameInput);
  
  
  const textarea = document.createElement("textarea");
  textarea.id = "comment-input";
  textarea.className = "add-form-text";
  textarea.placeholder = "Введите ваш комментарий";
  textarea.rows = 4;
  addForm.appendChild(textarea);
  
 
  const buttonRow = document.createElement("div");
  buttonRow.className = "add-form-row";
  
  const addButton = document.createElement("button");
  addButton.id = "add-comment-button";
  addButton.className = "add-form-button";
  addButton.textContent = "Написать";
  
  addButton.addEventListener("click", async () => {
    const text = textarea.value.trim();
    if (text) {
      await addComment(text);
      textarea.value = "";
    } else {
      alert("Введите текст комментария");
    }
  });
  
  buttonRow.appendChild(addButton);
  addForm.appendChild(buttonRow);
  

  const loadingMessage = document.createElement("p");
  loadingMessage.id = "comment-loading-message";
  loadingMessage.style.display = "none";
  loadingMessage.textContent = "Комментарий добавляется...";
  
  container.appendChild(addForm);
  container.appendChild(loadingMessage);
}