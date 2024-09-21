const express = require("express");
const investmentsRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const investmentController = require("../controllers/investmentsController");

investmentsRouter.get(
  "/:userId",
  authMiddleware,
  investmentController.getInvestmentsByUserId
);
investmentsRouter.post(
  "/",
  authMiddleware,
  investmentController.createInvestment
);
investmentsRouter.put(
  "/:id",
  authMiddleware,
  investmentController.updateInvestment
);
investmentsRouter.delete(
  "/:id",
  authMiddleware,
  investmentController.deleteInvestment
);

module.exports = investmentsRouter;
