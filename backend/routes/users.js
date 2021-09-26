import express from "express";
import { signin, signup, UpdateProfile } from "../controllers/users.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/updateProfile/:id",auth, UpdateProfile);

export default router;
