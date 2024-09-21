const express = require("express");
const upcomingExpensesRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUpcomingExpenses,
  createUpcomingExpense,
  updateUpcomingExpense,
  deleteUpcomingExpense,
} = require("../controllers/upcomingExpensesController");

upcomingExpensesRouter.get("/:userId", authMiddleware, getUpcomingExpenses);
upcomingExpensesRouter.post("/", authMiddleware, createUpcomingExpense);
upcomingExpensesRouter.put("/:id", authMiddleware, updateUpcomingExpense);
upcomingExpensesRouter.delete("/:id", authMiddleware, deleteUpcomingExpense);

module.exports = upcomingExpensesRouter;
