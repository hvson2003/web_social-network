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
