const BudgetOverview = require("../Models/BudgetOverview");
const createBudgetOverview = async (req, res) => {
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
};

const getBudgetOverview = async (req, res) => {
  try {
    const overview = await BudgetOverview.findAll({
      where: { userId: req.params.id },
    });
    res.status(200).json(overview);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch budget overview", details: error });
  }
};

const updateBudgetOverview = async (req, res) => {
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
};

const deleteBudgetOverview = async (req, res) => {
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
};

module.exports = {
  createBudgetOverview,
  getBudgetOverview,
  updateBudgetOverview,
  deleteBudgetOverview,
};
