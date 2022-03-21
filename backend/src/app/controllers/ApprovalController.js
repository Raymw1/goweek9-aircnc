const Booking = require("../models/Booking");

class ApprovalController {
  async store(req, res) {
    const booking = await Booking.findById(req.params.booking_id).populate(
      "spot"
    );
    booking.approved = true;
    await booking.save();
    return res.json(booking);
  }
}

module.exports = new ApprovalController();
