import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getLikes = (req, res) => {
  const sql = `SELECT userId FROM likes WHERE postId = ?`;

  db.query(sql, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data.map(like => like.userId));
  });
}


export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const sql = "INSERT INTO likes(`postId`,`userId`) VALUES(?)";
    const values = [
      req.body.postId,
      userInfo.id,
    ]

    db.query(sql, [values], (error) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post has been liked");
    });
  });
};

export const deleteLike = (req, res) => {  
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const sql = "DELETE FROM likes WHERE `postId` = ? AND `userId` = ?";

    db.query(sql, [req.query.postId, userInfo.id], (error) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post has been disliked");
    });
  });
};
