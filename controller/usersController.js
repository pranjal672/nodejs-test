const User = require("../model/User");

const getAllUser = async (req, res) => {
  console.log(req.cookies);
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No User exists." });
  res.json(users);
};

module.exports = {
  getAllUser,
};
