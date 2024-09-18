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

app.get("/fire-calculator/:userId", authMiddleware, async (req, res) => {
  try {
    const fireCalculator = await FireCalculator.findOne({
      where: { userId: req.params.userId },
    });
    res.status(200).json(fireCalculator);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve data", details: error });
  }
});

app.post("/fire-calculator", authMiddleware, async (req, res) => {
  try {
    const {
      lifestyleExpenses,
      retirementAge,
      currentSavings,
      annualSavings,
      userId,
    } = req.body;
    const newCalculator = await FireCalculator.create({
      lifestyleExpenses,
      retirementAge,
      currentSavings,
      annualSavings,
      userId,
    });
    res.status(201).json(newCalculator);
  } catch (error) {
    res.status(500).json({ error: "Failed to create record", details: error });
  }
});

app.put("/fire-calculator/:userId", authMiddleware, async (req, res) => {
  try {
    const updatedCalculator = await FireCalculator.update(req.body, {
      where: { userId: req.params.userId },
    });
    res.status(200).json(updatedCalculator);
  } catch (error) {
    res.status(500).json({ error: "Failed to update record", details: error });
  }
});

app.delete("/fire-calculator/:userId", authMiddleware, async (req, res) => {
  try {
    const deleted = await FireCalculator.destroy({
      where: { userId: req.params.userId },
    });
    res
      .status(200)
      .json({ message: "Record deleted successfully", count: deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record", details: error });
  }
});

app.get("/goals/:userId", authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve goals", details: error });
  }
});

app.post("/goals", authMiddleware, async (req, res) => {
  try {
    const { name, targetAmount, deadline, userId } = req.body;
    const newGoal = await Goal.create({ name, targetAmount, deadline, userId });
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: "Failed to create goal", details: error });
  }
});

app.put("/goals/:id", authMiddleware, async (req, res) => {
  try {
    const updatedGoal = await Goal.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: "Failed to update goal", details: error });
  }
});

app.delete("/goals/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Goal.destroy({ where: { id: req.params.id } });
    res
      .status(200)
      .json({ message: "Goal deleted successfully", count: deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete goal", details: error });
  }
});

app.get("/contributions/:goalId", authMiddleware, async (req, res) => {
  try {
    const contributions = await Contribution.findAll({
      where: { goalId: req.params.goalId },
    });
    res.status(200).json(contributions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve contributions", details: error });
  }
});

app.post("/contributions", authMiddleware, async (req, res) => {
  try {
    const { amount, date, goalId } = req.body;
    const newContribution = await Contribution.create({ amount, date, goalId });
    res.status(201).json(newContribution);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create contribution", details: error });
  }
});

app.put("/contributions/:id", authMiddleware, async (req, res) => {
  try {
    const updatedContribution = await Contribution.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedContribution);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update contribution", details: error });
  }
});

app.delete("/contributions/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Contribution.destroy({
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ message: "Contribution deleted successfully", count: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete contribution", details: error });
  }
});

app.get("/investments/:userId", authMiddleware, async (req, res) => {
  try {
    const investments = await Investments.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(investments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve investments", details: error });
  }
});

app.post("/investments", authMiddleware, async (req, res) => {
  try {
    const { name, status, type, amount, userId } = req.body;
    const newInvestment = await Investments.create({
      name,
      status,
      type,
      amount,
      userId,
    });
    res.status(201).json(newInvestment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create investment", details: error });
  }
});

app.put("/investments/:id", authMiddleware, async (req, res) => {
  try {
    const updatedInvestment = await Investments.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedInvestment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update investment", details: error });
  }
});

app.delete("/investments/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Investments.destroy({ where: { id: req.params.id } });
    res
      .status(200)
      .json({ message: "Investment deleted successfully", count: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete investment", details: error });
  }
});

app.get("/notifications/:userId", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve notifications", details: error });
  }
});

app.post("/notifications", authMiddleware, async (req, res) => {
  try {
    const { title, due_date, amount_due, status, userId } = req.body;
    const newNotification = await Notification.create({
      title,
      due_date,
      amount_due,
      status,
      userId,
    });
    res.status(201).json(newNotification);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create notification", details: error });
  }
});

app.put("/notifications/:id", authMiddleware, async (req, res) => {
  try {
    const updatedNotification = await Notification.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedNotification);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update notification", details: error });
  }
});

app.delete("/notifications/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Notification.destroy({
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ message: "Notification deleted successfully", count: deleted });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete notification", details: error });
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
