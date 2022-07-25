const User = require("../models/User");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({
        status: 200,
        msg: "Delete successfully",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
