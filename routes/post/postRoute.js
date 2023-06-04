import express from "express";
import { authenticateToken } from "../../middlewares/auth.js";
import { getPostByUSer } from "../../controllers/auth/post/postController.js";
const router = express.Router();

router.get("/post", authenticateToken, getPostByUSer);  

export default router;
