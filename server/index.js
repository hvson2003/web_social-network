import express from "express";

const app = express();

import authRoutes from "./src/routes/auth_route.js";
import userRoutes from "./src/routes/user_route.js";
import postRoutes from "./src/routes/post_route.js";
import commentRoutes from "./src/routes/comment_route.js";
import likeRoutes from "./src/routes/like_route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);

app.listen(8000, () => {
  console.log("API is working ...");
});
