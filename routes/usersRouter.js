// routes/usersRouter.js
import { Router } from "express";
import { usersListGet, usersCreateGet, usersCreatePost } from "../controllers/usersController.js";
const usersRouter = Router();

usersRouter.get("/", usersListGet);
usersRouter.get("/create", usersCreateGet);
usersRouter.post("/create", usersCreatePost);

export default usersRouter;
