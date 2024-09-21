const express = require("express");
const assetsController = require("../controllers/assetsController");
const authMiddleware = require("../middleware/authMiddleware");
const assetsRouter = express.Router();

assetsRouter.post("/", authMiddleware, assetsController.create);
assetsRouter.get("/:id", authMiddleware, assetsController.getAssets);
assetsRouter.put("/:id", authMiddleware, assetsController.updateAssets);
assetsRouter.delete("/:id", authMiddleware, assetsController.deleteAssets);

module.exports = assetsRouter;
