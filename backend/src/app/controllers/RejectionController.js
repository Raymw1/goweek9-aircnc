const Booking = require("../models/Booking");

class RejectionController {
  async store(req, res) {
    const booking = await Booking.findById(req.params.booking_id).populate(
      "spot"
    );
    booking.approved = false;
    await booking.save();
    return res.json(booking);
  }
}

module.exports = new RejectionController();
