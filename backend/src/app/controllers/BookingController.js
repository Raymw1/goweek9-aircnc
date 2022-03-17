const User = require("../models/User");
const Spot = require("../models/Spot");
const Booking = require("../models/Booking");

class DashboardController {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;
    const userExists = await User.findById(user_id);
    if (!userExists)
      return res
        .status(401)
        .json({ error: { message: "User does not exists!" } });
    const booking = await Booking.create({
      date,
      user: user_id,
      spot: spot_id,
    });
    await booking.populate("spot");
    await booking.populate("user");
    return res.json(booking);
  }
}

module.exports = new DashboardController();
