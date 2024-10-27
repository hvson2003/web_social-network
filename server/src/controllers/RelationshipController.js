import { db } from "../config/connect.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getRelationships = (req, res) => {
  const sql = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  db.query(sql, [req.query.followedUserId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data.map(relationship => relationship.followerUserId));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const sql = "INSERT INTO relationships(`followerUserId`, `followedUserId`) VALUES(?)";
    const values = [
      userInfo.id,
      req.body.userId,
    ];

    db.query(sql, [values], (error) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const sql = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    db.query(sql, [userInfo.id, req.query.userId], (error) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Unfollow");
    });
  })
};
