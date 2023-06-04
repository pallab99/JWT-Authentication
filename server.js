import express from "express";
import "dotenv/config";
import { authenticateToken } from "./middlewares/auth.js";
import { generateAccessToken } from "./helper/generateAccessToken.js";
import jwt from "jsonwebtoken";

const app = express();

const post = [
  {
    userName: "pallab",
    title: "post 1",
  },
  {
    userName: "pallab 1",
    title: "post 2",
  },
  {
    userName: "abc",
    title: "abc post",
  },
];

app.use(express.json());

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.get("/post", authenticateToken, (req, res) => {
  res.json(post.filter((post) => post.userName === req.user.name));
});
app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", (req, res) => {
  const { userName } = req.body;
  const user = { name: userName };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.json({
    user,
    accessToken,
    refreshToken,
  });
});

app.listen(3000, () => {
  console.log("server connected");
});
