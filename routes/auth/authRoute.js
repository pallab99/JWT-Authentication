import express from "express";
import {
  generateNewAccessToken,
  logIn,
  logOut,
} from "../../controllers/auth/authController.js";
const router = express.Router();

router.post("/token", generateNewAccessToken);

router.delete("/logout", logOut);

router.post("/login", logIn);

export default router;
