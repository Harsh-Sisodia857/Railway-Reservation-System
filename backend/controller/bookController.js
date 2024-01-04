const { calculateFarePrice, isTrainAvailable } = require("../utils/calculatingFare");
const booking = require("../model/booking");
const train = require('../model/trainModel');

const createBooking = async (req, res) => {
    const { trainId, from, to, qty } = req.body;
    const Train = await train.findById(trainId);
    if (!Train) return res.json({
        success: false,
        message: "Train Not Found"
    });
    if (!isTrainAvailable(from, to)) {
        return res.json({
            success: false,
            message: "Train Route Not Found"
        })
    }
    const fare = calculateFarePrice(from, to);
    console.log(req.user);
    const bookingData = await booking.create({
        user: req.user.id,
        train, from, to, qty, date : Date.now(), fare
    });
    res.status(201).json({
        success: true,
        bookingData,
    });

}

const getBooking = async (req, res) => {
    const {id} = req.params;
    const getBookingDetails = await booking.findById(id);
    if (!getBookingDetails) return res.json({ message : `Booking does not exist at id ${id}`,success : false });
    res.status(200).json({
        success:true,
        getBookingDetails
    });
}

const getBookings = async (req, res) => {
    const getBookingDetails = await booking.find({});
    res.status(200).json({
        success: true,
        getBookingDetails
    });
}

const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const bookingToBeDeleted = await booking.findById(id);
    if (bookingToBeDeleted)
        return res.json({ message: `Booking does not exist at id ${id}`, success: false });
    await bookingToBeDeleted.remove()
    res.status(200).json({
        success: true,
        message : "Booking is Deleted",
        bookingToBeDeleted
    });
}   

module.exports = { createBooking, getBookings, deleteBooking, getBooking };
