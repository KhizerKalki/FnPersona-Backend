const express = require("express");
const {
  createBudgetOverview,
  getBudgetOverview,
  updateBudgetOverview,
  deleteBudgetOverview,
} = require("../controllers/budgetOverviewController");
const authMiddleware = require("../middleware/authMiddleware");

const budgetOverviewRouter = express.Router();

budgetOverviewRouter.post("/", authMiddleware, createBudgetOverview);
budgetOverviewRouter.get("/:id", authMiddleware, getBudgetOverview);
budgetOverviewRouter.put("/:id", authMiddleware, updateBudgetOverview);
budgetOverviewRouter.delete("/:id", authMiddleware, deleteBudgetOverview);

module.exports = budgetOverviewRouter;
