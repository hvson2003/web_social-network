import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");


    const sql = (userId !== "undefined")
      ? "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) WHERE p.userId = ? ORDER BY p.createdAt DESC"
      : "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";

    const values = (userId !== "undefined") ? [userId] : [userInfo.id, userInfo.id];
    db.query(sql, values, (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const sql = "INSERT INTO posts(`desc`, `img`, `userId`, `createdAt`) VALUES(?)";

    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ]

    db.query(sql, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post has been created");
    });
  });
}
