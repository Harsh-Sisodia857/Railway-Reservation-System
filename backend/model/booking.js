const mongoose = require('mongoose')


const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "train",
    },
    qty: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    fare: {
        type: Number
    }
},{
    timestamps: true
})

module.exports = mongoose.model('booking', bookingSchema)