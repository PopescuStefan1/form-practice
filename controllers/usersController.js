// controllers/usersController.js
import usersStorage from "../storages/usersStorage.js";

export function usersListGet(req, res) {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
}

export function usersCreateGet(req, res) {
  res.render("createUser", {
    title: "Create user",
  });
}

export function usersCreatePost(req, res) {
  const { firstName, lastName } = req.body;
  usersStorage.addUser({ firstName, lastName });
  res.redirect("/");
}
