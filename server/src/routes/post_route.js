import express from "express";
import { getPosts } from "../controllers/post_controller.js";

const router = express.Router()

router.get("/", getPosts)

export default router
