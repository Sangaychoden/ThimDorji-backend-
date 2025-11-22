
// const express = require("express");
// const router = express.Router();
// const bookingController = require("../controllers/bookingController");

// //Import authentication middlewares properly
// const {
//   authenticateAdmin,
//   authenticateReceptionist,
//   authenticateAdminOrReceptionist,
// } = require("../controllers/adminController");


// //PUBLIC ROUTES

// router.post("/book-rooms", bookingController.createBooking); // User books rooms
// router.get("/search/:bookingNumber", bookingController.getBookingByNumber);


// // ADMIN ROUTES

// router.put("/assign-room/:bookingId", authenticateAdmin, bookingController.assignRoom); 
// router.put("/confirm/:bookingId", authenticateAdmin, bookingController.confirmBooking);
// router.put("/reject/:bookingId", authenticateAdmin, bookingController.rejectBooking);
// // 🧑‍💼 RECEPTIONIST ROUTES
// router.put("/checkin/:bookingId", authenticateReceptionist, bookingController.checkInBooking);
// router.put("/change-room/:bookingId", authenticateAdminOrReceptionist, bookingController.changeRoom);
// // 🔍 FETCH LISTS
// router.get("/pending", authenticateAdmin, bookingController.getPendingBookings);
// router.get("/confirmed", authenticateAdminOrReceptionist, bookingController.getConfirmedBookings);
// router.get("/checked-in", authenticateAdminOrReceptionist, bookingController.getCheckedInBookings);
// router.get("/dashboard/stats", authenticateAdminOrReceptionist, bookingController.getDashboardStats);
// router.get("/dashboard/monthly", authenticateAdminOrReceptionist, bookingController.getMonthlyStats);
// // router.put("/guarantee/:bookingId", bookingController.guaranteeBooking);
// router.put("/guarantee-booking/:bookingId", bookingController.guaranteeBooking);
// router.get(
//   "/confirmed-guaranteed-bookings",
//   bookingController.getConfirmedAndGuaranteedBookings
// );
// router.put("/cancel/:bookingId", bookingController.cancelBooking);
// router.get("/cancelled/all", bookingController.getAllCancelledBookings);

// module.exports = router;
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Import authentication middlewares
const {
  authenticateAdmin,
  authenticateReceptionist,
  authenticateAdminOrReceptionist,
} = require("../controllers/adminController");

// -------------------------
// PUBLIC ROUTES
// -------------------------
router.post("/book-rooms", bookingController.createBooking); 
router.get("/search/:bookingNumber", bookingController.getBookingByNumber);

// -------------------------
// ADMIN ROUTES (VIEW ONLY)
// -------------------------
// Admin can ONLY view lists and details – NO actions

router.get("/pending", authenticateAdmin, bookingController.getPendingBookings);
router.get("/confirmed", authenticateAdmin, bookingController.getConfirmedBookings);
router.get("/checked-in", authenticateAdmin, bookingController.getCheckedInBookings);
router.get("/dashboard/stats", authenticateAdmin, bookingController.getDashboardStats);
router.get("/dashboard/monthly", authenticateAdmin, bookingController.getMonthlyStats);
router.get("/cancelled/all", authenticateAdmin, bookingController.getAllCancelledBookings);

// -------------------------
// RECEPTIONIST ROUTES (ALL ACTIONS)
// -------------------------

// Assign room
router.put("/assign-room/:bookingId", authenticateReceptionist, bookingController.assignRoom);

// Confirm booking
router.put("/confirm/:bookingId", authenticateReceptionist, bookingController.confirmBooking);

// Reject booking
router.put("/reject/:bookingId", authenticateReceptionist, bookingController.rejectBooking);

// Check in booking
router.put("/checkin/:bookingId", authenticateReceptionist, bookingController.checkInBooking);

// Change room
router.put("/change-room/:bookingId", authenticateReceptionist, bookingController.changeRoom);

// Guarantee booking
router.put("/guarantee-booking/:bookingId", authenticateReceptionist, bookingController.guaranteeBooking);

// Cancel booking
router.put("/cancel/:bookingId", authenticateReceptionist, bookingController.cancelBooking);

// List guaranteed bookings
router.get(
  "/confirmed-guaranteed-bookings",
  authenticateReceptionist,
  bookingController.getConfirmedAndGuaranteedBookings
);

module.exports = router;
