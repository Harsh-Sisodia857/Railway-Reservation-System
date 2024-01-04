const express = require("express")
const router = express.Router();

const {
    createBooking,
    getBookings,
    deleteBooking,
    getBooking,
} = require("../controller/bookController.js");

const {isAuthenticatedUser} = require("../middleware/auth.js")

router.post("/", isAuthenticatedUser, createBooking);
router.get("/bookings", isAuthenticatedUser, getBookings);
router.get("/:id", isAuthenticatedUser, getBooking);
router.delete("/:id", isAuthenticatedUser, deleteBooking);

module.exports = router;