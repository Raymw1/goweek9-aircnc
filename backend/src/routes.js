const routes = require("express").Router();
const multer = require("multer");
const upload = multer(require("./config/upload"));

const controllers = require("./app/controllers");

routes.post("/sessions", controllers.SessionController.store);
routes.get("/dashboard", controllers.DashboardController.show);
routes.get("/spots", controllers.SpotController.index);
routes.post(
  "/spots",
  upload.single("thumbnail"),
  controllers.SpotController.store
);
routes.post("/spots/:spot_id/bookings", controllers.BookingController.store);
routes.post(
  "/bookings/:booking_id/approvals",
  controllers.ApprovalController.store
);
routes.post(
  "/bookings/:booking_id/rejections",
  controllers.RejectionController.store
);

module.exports = routes;
