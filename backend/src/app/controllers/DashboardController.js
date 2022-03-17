const User = require("../models/User");
const Spot = require("../models/Spot");

class DashboardController {
  async show(req, res) {
    const { user_id } = req.headers;
    const userExists = await User.findById(user_id);
    if (!userExists)
      return res
        .status(401)
        .json({ error: { message: "User does not exists!" } });
    const spots = await Spot.find({ user: user_id });
    return res.json(spots);
  }
}

module.exports = new DashboardController();
