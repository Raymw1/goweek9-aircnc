const User = require("../models/User");

class SessionController {
  async store(req, res) {
    const { email } = req.body;
    if (!email.trim())
      return res.status(400).json({ error: { message: "Invalid email!" } });
    let user = await User.findOne({ email });
    user = user ? user : await User.create({ email });
    return res.json(user);
  }
}

module.exports = new SessionController();
