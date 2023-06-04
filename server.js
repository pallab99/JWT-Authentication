import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth/authRoute.js";
import postRouter from "./routes/post/postRoute.js";
const app = express();

app.use(express.json());

app.use("/api/user", authRouter);
app.use("/api", postRouter);

app.listen(3000, () => {
  console.log("server connected");
});
