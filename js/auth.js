let currentUser = null;

export function setCurrentUser(user) {
  currentUser = user;
  if (user && user.token) {
    localStorage.setItem("token", user.token);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userLogin", user.login);
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userLogin");
  }
}

export function getCurrentUser() {
  if (currentUser) return currentUser;
  
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");
  const login = localStorage.getItem("userLogin");
  
  if (token && name) {
    currentUser = { token, name, login };
    return currentUser;
  }
  return null;
}

export function checkAuth() {
  return !!getCurrentUser();
}

export function logout() {
  currentUser = null;
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  localStorage.removeItem("userLogin");
}