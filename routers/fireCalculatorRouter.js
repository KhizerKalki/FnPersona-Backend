const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFireCalculator,
  getFireCalculator,
  updateFireCalculator,
  deleteFireCalculator,
} = require("../controllers/fireCalculatorController");

const fireCalculatorRouter = express.Router();

fireCalculatorRouter.post("/", authMiddleware, createFireCalculator);
fireCalculatorRouter.get("/:userId", authMiddleware, getFireCalculator);
fireCalculatorRouter.put("/:userId", authMiddleware, updateFireCalculator);
fireCalculatorRouter.delete("/:userId", authMiddleware, deleteFireCalculator);

module.exports = fireCalculatorRouter;
