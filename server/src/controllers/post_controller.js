import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");


    const sql = "SELECT p.*, u.id AS userId FROM posts AS p JOIN users AS u ON (p.userId = u.id) JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";

    console.log("ID:", userInfo.id);
    
    db.query(sql, [userInfo.id, userInfo.id], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};
