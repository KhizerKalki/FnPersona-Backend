const express = require("express");
const transactionsRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");

transactionsRouter.get("/:userId", authMiddleware, getTransactions);
transactionsRouter.post("/", authMiddleware, createTransaction);
transactionsRouter.put("/:id", authMiddleware, updateTransaction);
transactionsRouter.delete("/:id", authMiddleware, deleteTransaction);

module.exports = transactionsRouter;
