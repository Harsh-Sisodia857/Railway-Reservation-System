const express = require("express")
const router = express.Router();

const {
    createBooking,
    getBookings,
    deleteBooking,
    getBooking,
} = require("../controllers/bookController.js");


router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.delete("/:id", deleteBooking);

module.exports = router;