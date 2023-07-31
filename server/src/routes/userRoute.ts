import express from "express";
import * as userController from "../controllers/userConroller";
import { requiredAuth } from "../middleware/auth";

const router = express.Router();

router.get("/",requiredAuth , userController.getAuthenticatedUser);

router.post("/logout", userController.logout);

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

export default router;
