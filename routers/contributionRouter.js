const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createContribution,
  getContributions,
  updateContribution,
  deleteContribution,
} = require("../controllers/contributionController");
const contributionRouter = express.Router();

contributionRouter.post("/", authMiddleware, createContribution);
contributionRouter.get("/:goalId", authMiddleware, getContributions);
contributionRouter.put("/:id", authMiddleware, updateContribution);
contributionRouter.delete("/:id", authMiddleware, deleteContribution);

module.exports = contributionRouter;
