import jwt from "jsonwebtoken";
import { generateAccessToken } from "../../helper/generateAccessToken.js";

let refreshTokens = [];

export const generateNewAccessToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens?.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
};

export const logOut = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

export const logIn = (req, res) => {
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
};
