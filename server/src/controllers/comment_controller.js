import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import moment from "moment";

export const getComments = (req, res) => {
  const sql = `SELECT c.*, u.id AS userId, name, profilePic from comments AS c JOIN users AS u ON (c.userId =u.id) WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  db.query(sql, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  });
}

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    const sql = "INSERT INTO comments(`desc`,`postId`,`userId`,`createdAt`) VALUES(?)";

    const values = [
      req.body.desc,
      req.body.postId,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
    ]

    db.query(sql, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Comment has been created");
    });
  });
};
