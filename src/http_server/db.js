export const users = [];
export const rooms = [];
export const usersCountInTheRoom = [];
export let startGame = false;
export let currentUser = {};

export function getCurrentUser() {
  return currentUser;
}
export function setCurrentUser(name, index) {
  currentUser.name = name;
  currentUser.index = index;
}
