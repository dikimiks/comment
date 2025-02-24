let currentUser = null;

export function getCurrentUser() {
  if (!currentUser) {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
    }
  }
  return currentUser;
}

export function setCurrentUser(user) {
  currentUser = user;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", user.token);
}

export function checkAuth() {
  return localStorage.getItem("token") !== null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  currentUser = null;
}