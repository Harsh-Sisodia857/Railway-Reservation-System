const { calculateFarePrice, isTrainAvailable } = require("../utils/calculatingFare");
const Booking = require("../model/booking");
const Train = require('../model/trainModel');

const createBooking = async (req, res) => {
    const { trainId, from, to, qty } = req.body;
    const train = await Train.findById(trainId);
    if (!train) return res.json({
        success: false,
        message: "Train Not Found"
    });
    if (!isTrainAvailable(from, to)) {
        return res.json({
            success: false,
            message: "Train Route Not Found"
        })
    }
    const fare = (calculateFarePrice(from, to))*qty;
    console.log(req.user);
    const BookingData = await Booking.create({
        user: req.user.id,
        train, from, to, qty, date : Date.now(), fare
    });
    res.status(201).json({
        success: true,
        BookingData,
    });

}

const getBooking = async (req, res) => {
    const {id} = req.params;
    const getBookingDetails = await Booking.findById(id);
    if (!getBookingDetails) return res.json({ message : `Booking does not exist at id ${id}`,success : false });
    res.status(200).json({
        success:true,
        getBookingDetails
    });
}

const getBookings = async (req, res) => {
    const getBookingDetails = await Booking.find({});
    res.status(200).json({
        success: true,
        getBookingDetails
    });
}

const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const BookingToBeDeleted = await Booking.findById(id);
    if (!BookingToBeDeleted)
        return res.json({ message: `Booking does not exist at id ${id}`, success: false });
    await Booking.deleteOne({ _id: id }); 
        res.status(200).json({
        success: true,
        message : "Booking is Deleted",
        BookingToBeDeleted
    });
}   

module.exports = { createBooking, getBookings, deleteBooking, getBooking };
