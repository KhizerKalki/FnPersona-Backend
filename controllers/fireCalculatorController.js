const FireCalculator = require("./../Models/FireCalculator");

exports.getFireCalculator = async (req, res) => {
  try {
    const fireCalculator = await FireCalculator.findOne({
      where: { userId: req.params.userId },
    });
    res.status(200).json(fireCalculator);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve data", details: error });
  }
};

exports.createFireCalculator = async (req, res) => {
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
};

exports.updateFireCalculator = async (req, res) => {
  try {
    const updatedCalculator = await FireCalculator.update(req.body, {
      where: { userId: req.params.userId },
    });
    res.status(200).json(updatedCalculator);
  } catch (error) {
    res.status(500).json({ error: "Failed to update record", details: error });
  }
};

exports.deleteFireCalculator = async (req, res) => {
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
};
