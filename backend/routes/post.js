import express from "express";
import {
  CreatePost,
  deletePost,
  getDetails,
  GetMyPost,
  getPost,
  getPostBySearch,
  likedPost,
  updatePost,
} from "../controllers/posts.js";

import auth from "../middleware/authentication.js";

const router = express.Router();

router.get("/", getPost);
router.get("/search", getPostBySearch);
router.post("/createPost", auth, CreatePost);
router.patch("/:id", auth, updatePost);
router.get("/:id", getDetails);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likedPost);
router.patch("/GetMyPost/:id/", GetMyPost);

export default router;
