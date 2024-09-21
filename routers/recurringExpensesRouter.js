const express = require("express");
const recurringExpensesRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getRecurringExpenses,
  createRecurringExpense,
  updateRecurringExpense,
  deleteRecurringExpense,
} = require("../controllers/recurringExpensesController");

recurringExpensesRouter.get("/:userId", authMiddleware, getRecurringExpenses);
recurringExpensesRouter.post("/", authMiddleware, createRecurringExpense);
recurringExpensesRouter.put("/:id", authMiddleware, updateRecurringExpense);
recurringExpensesRouter.delete("/:id", authMiddleware, deleteRecurringExpense);

module.exports = recurringExpensesRouter;
