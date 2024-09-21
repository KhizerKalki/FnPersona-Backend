const Transaction = require("../Models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve transactions",
      details: error,
    });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { date, amount, category, description, userId } = req.body;
    const newTransaction = await Transaction.create({
      date,
      amount,
      category,
      description,
      userId,
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create transaction",
      details: error,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update transaction",
      details: error,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Transaction deleted successfully",
      count: deleted,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete transaction",
      details: error,
    });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
