const AssetsLiabilities = require("./../Models/AssetsLiabilities");

exports.create = async (req, res) => {
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
};
exports.getAssets = async (req, res) => {
  try {
    const records = await AssetsLiabilities.findAll({
      where: { userId: req.params.id },
    });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records", details: error });
  }
};
exports.updateAssets = async (req, res) => {
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
};
exports.deleteAssets = async (req, res) => {
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
};
