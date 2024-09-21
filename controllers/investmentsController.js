const Investments = require("./../Models/Investments");

const getInvestmentsByUserId = async (req, res) => {
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
};

const createInvestment = async (req, res) => {
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
};

const updateInvestment = async (req, res) => {
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
};

const deleteInvestment = async (req, res) => {
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
};

module.exports = {
  getInvestmentsByUserId,
  createInvestment,
  updateInvestment,
  deleteInvestment,
};
