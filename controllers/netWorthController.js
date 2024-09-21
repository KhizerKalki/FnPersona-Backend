const TotalNetWorth = require("../Models/TotalNetWorth");

const getNetWorth = async (req, res) => {
  try {
    const netWorth = await TotalNetWorth.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(netWorth);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve total net worth",
      details: error,
    });
  }
};

const createNetWorth = async (req, res) => {
  try {
    const { value, percentage_change, userId } = req.body;
    const newNetWorth = await TotalNetWorth.create({
      value,
      percentage_change,
      userId,
    });
    res.status(201).json(newNetWorth);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create total net worth entry",
      details: error,
    });
  }
};

const updateNetWorth = async (req, res) => {
  try {
    const updatedNetWorth = await TotalNetWorth.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedNetWorth);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update total net worth entry",
      details: error,
    });
  }
};

const deleteNetWorth = async (req, res) => {
  try {
    const deleted = await TotalNetWorth.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Total net worth entry deleted successfully",
      count: deleted,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete total net worth entry",
      details: error,
    });
  }
};

module.exports = {
  getNetWorth,
  createNetWorth,
  updateNetWorth,
  deleteNetWorth,
};
