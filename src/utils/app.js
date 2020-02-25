import cookie from "js-cookie";

const adminToken = "admin_token";
const usernameKey = "username";

export function getToken() {
  return cookie.get(adminToken);
}

export function setToken(token) {
  return cookie.set(adminToken, token);
}
export function removeToken(token) {
  return cookie.remove(adminToken, token);
}

export function setUserName(value) {
  return cookie.set(usernameKey, value);
}
export function getUserName() {
  return cookie.get(usernameKey);
}

export function removeUserName() {
  return cookie.remove(usernameKey);
}
