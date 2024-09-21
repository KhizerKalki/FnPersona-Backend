const express = require("express");
const userGrowthRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserGrowth,
  createUserGrowth,
  updateUserGrowth,
  deleteUserGrowth,
} = require("../controllers/userGrowthController");

userGrowthRouter.get("/:userId", authMiddleware, getUserGrowth);
userGrowthRouter.post("/", authMiddleware, createUserGrowth);
userGrowthRouter.put("/:id", authMiddleware, updateUserGrowth);
userGrowthRouter.delete("/:id", authMiddleware, deleteUserGrowth);

module.exports = userGrowthRouter;
