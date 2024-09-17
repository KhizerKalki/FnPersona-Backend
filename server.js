require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database"); // DB connection

// Import models
const User = require("./Models/user");
const TotalNetWorth = require("./Models/TotalNetWorth");
const BudgetOverview = require("./Models/BudgetOverview");
const UserGrowth = require("./Models/UserGrowth");
const AssetsLiabilities = require("./Models/AssetsLiabilities");
const Notifications = require("./Models/Notifications");
const UpcomingExpenses = require("./Models/UpcomingExpenses");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.create({ firstname, lastname, email, password });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "User creation failed", details: error });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateJWT();
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error });
  }
});

app.post("/assets-liabilities", authMiddleware, async (req, res) => {
  const {
    userId,
    assets_value,
    liabilities_value,
    assets_percentage,
    liabilities_percentage,
  } = req.body;
  try {
    const record = await AssetsLiabilities.create({
      userId,
      assets_value,
      liabilities_value,
      assets_percentage,
      liabilities_percentage,
    });
    res
      .status(201)
      .json({ message: "Assets and Liabilities created successfully", record });
  } catch (error) {
    res.status(500).json({ error: "Failed to create record", details: error });
  }
});

app.get("/assets-liabilities/:userId", authMiddleware, async (req, res) => {
  try {
    const records = await AssetsLiabilities.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records", details: error });
  }
});

app.put("/assets-liabilities/:id", authMiddleware, async (req, res) => {
  const {
    assets_value,
    liabilities_value,
    assets_percentage,
    liabilities_percentage,
  } = req.body;
  try {
    const record = await AssetsLiabilities.findByPk(req.params.id);
    if (record) {
      await record.update({
        assets_value,
        liabilities_value,
        assets_percentage,
        liabilities_percentage,
      });
      res.status(200).json({ message: "Record updated successfully", record });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update record", details: error });
  }
});

app.delete("/assets-liabilities/:id", authMiddleware, async (req, res) => {
  try {
    const result = await AssetsLiabilities.destroy({
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).json({ message: "Record deleted successfully" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record", details: error });
  }
});

app.post("/budget-overview", authMiddleware, async (req, res) => {
  const {
    userId,
    totalIncome,
    totalExpense,
    remainingBudget,
    current_budget,
    budget_change_percentage,
    overallBudgetDistribution,
    expensesBreakdown,
    spendingVsBudget,
    notifications,
    dateRangeStart,
    dateRangeEnd,
    newUserGrowthPercentage,
    goalStatus,
  } = req.body;
  try {
    const overview = await BudgetOverview.create({
      userId,
      totalIncome,
      totalExpense,
      remainingBudget,
      current_budget,
      budget_change_percentage,
      overallBudgetDistribution,
      expensesBreakdown,
      spendingVsBudget,
      notifications,
      dateRangeStart,
      dateRangeEnd,
      newUserGrowthPercentage,
      goalStatus,
    });
    res
      .status(201)
      .json({ message: "Budget overview created successfully", overview });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create budget overview", details: error });
  }
});

app.get("/budget-overview/:userId", authMiddleware, async (req, res) => {
  try {
    const overview = await BudgetOverview.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(overview);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch budget overview", details: error });
  }
});
app.put("/budget-overview/:id", authMiddleware, async (req, res) => {
  const {
    totalIncome,
    totalExpense,
    remainingBudget,
    current_budget,
    budget_change_percentage,
    overallBudgetDistribution,
    expensesBreakdown,
    spendingVsBudget,
    notifications,
    dateRangeStart,
    dateRangeEnd,
    newUserGrowthPercentage,
    goalStatus,
  } = req.body;
  try {
    const overview = await BudgetOverview.findByPk(req.params.id);
    if (overview) {
      await overview.update({
        totalIncome,
        totalExpense,
        remainingBudget,
        current_budget,
        budget_change_percentage,
        overallBudgetDistribution,
        expensesBreakdown,
        spendingVsBudget,
        notifications,
        dateRangeStart,
        dateRangeEnd,
        newUserGrowthPercentage,
        goalStatus,
      });
      res
        .status(200)
        .json({ message: "Budget overview updated successfully", overview });
    } else {
      res.status(404).json({ message: "Budget overview not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update budget overview", details: error });
  }
});

app.delete("/budget-overview/:id", authMiddleware, async (req, res) => {
  try {
    const result = await BudgetOverview.destroy({
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).json({ message: "Budget overview deleted successfully" });
    } else {
      res.status(404).json({ message: "Budget overview not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete budget overview", details: error });
  }
});

app.post("/budget-overview", authMiddleware, async (req, res) => {
  const {
    userId,
    totalIncome,
    totalExpense,
    remainingBudget,
    current_budget,
    budget_change_percentage,
    overallBudgetDistribution,
    expensesBreakdown,
    spendingVsBudget,
    notifications,
    dateRangeStart,
    dateRangeEnd,
    newUserGrowthPercentage,
    goalStatus,
  } = req.body;
  try {
    const overview = await BudgetOverview.create({
      userId,
      totalIncome,
      totalExpense,
      remainingBudget,
      current_budget,
      budget_change_percentage,
      overallBudgetDistribution,
      expensesBreakdown,
      spendingVsBudget,
      notifications,
      dateRangeStart,
      dateRangeEnd,
      newUserGrowthPercentage,
      goalStatus,
    });
    res
      .status(201)
      .json({ message: "Budget overview created successfully", overview });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create budget overview", details: error });
  }
});

app.get("/budget-overview/:userId", authMiddleware, async (req, res) => {
  try {
    const overview = await BudgetOverview.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(overview);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch budget overview", details: error });
  }
});

app.put("/budget-overview/:id", authMiddleware, async (req, res) => {
  const {
    totalIncome,
    totalExpense,
    remainingBudget,
    current_budget,
    budget_change_percentage,
    overallBudgetDistribution,
    expensesBreakdown,
    spendingVsBudget,
    notifications,
    dateRangeStart,
    dateRangeEnd,
    newUserGrowthPercentage,
    goalStatus,
  } = req.body;
  try {
    const overview = await BudgetOverview.findByPk(req.params.id);
    if (overview) {
      await overview.update({
        totalIncome,
        totalExpense,
        remainingBudget,
        current_budget,
        budget_change_percentage,
        overallBudgetDistribution,
        expensesBreakdown,
        spendingVsBudget,
        notifications,
        dateRangeStart,
        dateRangeEnd,
        newUserGrowthPercentage,
        goalStatus,
      });
      res
        .status(200)
        .json({ message: "Budget overview updated successfully", overview });
    } else {
      res.status(404).json({ message: "Budget overview not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update budget overview", details: error });
  }
});

app.delete("/budget-overview/:id", authMiddleware, async (req, res) => {
  try {
    const result = await BudgetOverview.destroy({
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).json({ message: "Budget overview deleted successfully" });
    } else {
      res.status(404).json({ message: "Budget overview not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete budget overview", details: error });
  }
});

// Sync models and start server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
