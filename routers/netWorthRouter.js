const express = require("express");
const netWorthRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getNetWorth,
  createNetWorth,
  updateNetWorth,
  deleteNetWorth,
} = require("../controllers/netWorthController");

netWorthRouter.get("/:userId", authMiddleware, getNetWorth);
netWorthRouter.post("/", authMiddleware, createNetWorth);
netWorthRouter.put("/:id", authMiddleware, updateNetWorth);
netWorthRouter.delete("/:id", authMiddleware, deleteNetWorth);

module.exports = netWorthRouter;
