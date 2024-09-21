const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/GoalController");

const goalRouter = express.Router();

goalRouter.post("/", authMiddleware, createGoal);
goalRouter.get("/:userId", authMiddleware, getGoals);
goalRouter.put("/:userId", authMiddleware, updateGoal);
goalRouter.delete("/:userId", authMiddleware, deleteGoal);

module.exports = goalRouter;
