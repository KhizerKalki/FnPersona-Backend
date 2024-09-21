const UserGrowth = require("../Models/UserGrowth");

const getUserGrowth = async (req, res) => {
  try {
    const growthData = await UserGrowth.findAll({
      where: { userId: req.params.userId },
    });
    res.status(200).json(growthData);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve user growth data",
      details: error,
    });
  }
};

const createUserGrowth = async (req, res) => {
  try {
    const { new_users_percentage, goal, current_value, userId } = req.body;
    const newUserGrowth = await UserGrowth.create({
      new_users_percentage,
      goal,
      current_value,
      userId,
    });
    res.status(201).json(newUserGrowth);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create user growth entry",
      details: error,
    });
  }
};

const updateUserGrowth = async (req, res) => {
  try {
    const updatedUserGrowth = await UserGrowth.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedUserGrowth);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update user growth entry",
      details: error,
    });
  }
};

const deleteUserGrowth = async (req, res) => {
  try {
    const deleted = await UserGrowth.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "User growth entry deleted successfully",
      count: deleted,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete user growth entry",
      details: error,
    });
  }
};

module.exports = {
  getUserGrowth,
  createUserGrowth,
  updateUserGrowth,
  deleteUserGrowth,
};
