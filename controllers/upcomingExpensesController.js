const UpcomingExpenses = require("../Models/UpcomingExpenses");

const getUpcomingExpenses = async (req, res) => {
  try {
    const expenses = await UpcomingExpenses.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve upcoming expenses",
      details: error,
    });
  }
};

const createUpcomingExpense = async (req, res) => {
  try {
    const { title, due_date, amount_due, userId } = req.body;
    const newExpense = await UpcomingExpenses.create({
      title,
      due_date,
      amount_due,
      userId,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create upcoming expense",
      details: error,
    });
  }
};

const updateUpcomingExpense = async (req, res) => {
  try {
    const updatedExpense = await UpcomingExpenses.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update upcoming expense",
      details: error,
    });
  }
};

const deleteUpcomingExpense = async (req, res) => {
  try {
    const deleted = await UpcomingExpenses.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Upcoming expense deleted successfully",
      count: deleted,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete upcoming expense",
      details: error,
    });
  }
};

module.exports = {
  getUpcomingExpenses,
  createUpcomingExpense,
  updateUpcomingExpense,
  deleteUpcomingExpense,
};
