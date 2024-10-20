import express from "express";

const app = express();

import authRoutes from "./src/routes/auth_route.js";
import userRoutes from "./src/routes/user_route.js";
import postRoutes from "./src/routes/post_route.js";
import commentRoutes from "./src/routes/comment_route.js";
import likeRoutes from "./src/routes/like_route.js";
import relationshipRoutes from "./src/routes/relationship_route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import multer from "multer";

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
}));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/relationship", relationshipRoutes);

app.listen(8000, () => {
  console.log("API is working ...");
});
