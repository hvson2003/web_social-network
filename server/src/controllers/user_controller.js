import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM users WHERE id=?";

  db.query(sql, [userId], (error, data) => {
    if (error) return res.status(500).json(error);

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...info } = data[0];
    return res.json(info);
  });
};


export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const sql = "UPDATE users SET `name` = ?,`city` = ?,`website` = ?,`profilePic` = ?,`coverPic` = ? WHERE id = ?";

    db.query(sql, [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.profilePic,
      req.body.coverPic,
      userInfo.id
    ], (error, data) => {
      if (error) res.status(500).json(error);
      if (data.affectedRow > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your post!");
    })
  });
};
