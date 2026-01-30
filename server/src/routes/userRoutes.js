import express from "express";
import { getUserProfile, updateUserProfile, getUserPosts, searchUsers, getProfileByHandle } from "../controllers/userProfileController.js";
import { requireAuth } from "../middleware/clerkAuth.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "✅ User routes are working fine!", timestamp: new Date().toISOString() });
});

router.get("/profile/test", (req, res) => {
  res.json({ message: "✅ Profile routes are working!", timestamp: new Date().toISOString() });
});

router.get("/search", searchUsers);
router.get("/profile/handle/:handle", getProfileByHandle);
router.get("/profile/:userId", getUserProfile);
router.put("/profile", requireAuth, updateUserProfile);
router.get("/:userId/posts", getUserPosts);

export default router;

