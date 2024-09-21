const RecurringExpenses = require("./../Models/RecurringExpenses");

const getRecurringExpenses = async (req, res) => {
  try {
    const expenses = await RecurringExpenses.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve recurring expenses",
      details: error,
    });
  }
};

const createRecurringExpense = async (req, res) => {
  try {
    const { name, amount, dueDate, frequency, participants, userId } = req.body;
    const newExpense = await RecurringExpenses.create({
      name,
      amount,
      dueDate,
      frequency,
      participants,
      userId,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create recurring expense",
      details: error,
    });
  }
};

const updateRecurringExpense = async (req, res) => {
  try {
    const updatedExpense = await RecurringExpenses.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update recurring expense",
      details: error,
    });
  }
};

const deleteRecurringExpense = async (req, res) => {
  try {
    const deleted = await RecurringExpenses.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Recurring expense deleted successfully",
      count: deleted,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete recurring expense",
      details: error,
    });
  }
};

module.exports = {
  getRecurringExpenses,
  createRecurringExpense,
  updateRecurringExpense,
  deleteRecurringExpense,
};
