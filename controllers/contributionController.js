const Contribution = require("./../Models/Goals");

exports.getContributions = async (req, res) => {
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
};

exports.createContribution = async (req, res) => {
  try {
    const { amount, date, goalId } = req.body;
    const newContribution = await Contribution.create({ amount, date, goalId });
    res.status(201).json(newContribution);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create contribution", details: error });
  }
};

exports.updateContribution = async (req, res) => {
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
};

exports.deleteContribution = async (req, res) => {
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
};
