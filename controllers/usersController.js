// controllers/usersController.js
import usersStorage from "../storages/usersStorage.js";
import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const formatErr = "must be formatted correctly.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").trim().isEmail().withMessage(`Email ${formatErr}`),
  body("age")
    .trim()
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be a number between 18 and 120")
    .optional({ nullable: true, checkFalsy: true }),
  body("bio").trim().isLength({ max: 200 }).withMessage("Bio must be between 0 and 200 characters"),
];

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

export const usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

export const usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

export const usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    console.log(req.body);
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
export const usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

export const usersSearch = (req, res) => {
  const { name, email } = req.query;
  const user = usersStorage.getUser(name, email);
  console.log(user);
  res.render("search", {
    title: "Searched user",
    user: user,
  });
};
