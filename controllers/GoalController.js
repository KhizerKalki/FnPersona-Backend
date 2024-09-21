const Goal = require("./../Models/Goals");

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve goals", details: error });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const { name, targetAmount, deadline, userId } = req.body;
    const newGoal = await Goal.create({ name, targetAmount, deadline, userId });
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: "Failed to create goal", details: error });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: "Failed to update goal", details: error });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const deleted = await Goal.destroy({ where: { id: req.params.id } });
    res
      .status(200)
      .json({ message: "Goal deleted successfully", count: deleted });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete goal", details: error });
  }
};
