const User = require("../models/User");
const Spot = require("../models/Spot");

class SpotController {
  async index(req, res) {
    const { tech } = req.query;
    const spots = await Spot.find({ techs: tech });
    return res.json(spots);
  }

  async store(req, res) {
    const { filename: thumbnail } = req.file;
    const { company, techs, price } = req.body;
    const { user_id: user } = req.headers;
    const userExists = await User.findById(user);
    if (!userExists)
      return res
        .status(401)
        .json({ error: { message: "User does not exists!" } });
    const spot = await Spot.create({
      thumbnail,
      company,
      techs: techs.split(",").map((tech) => tech.trim()),
      price,
      user,
    });
    return res.json(spot);
  }
}

module.exports = new SpotController();
