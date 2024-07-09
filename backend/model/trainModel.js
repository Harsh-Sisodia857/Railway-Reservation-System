const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: [true,"Please Enter trainName"]
    },
    trainNumber: {
        type: Number,
        required: [true, "Please Enter Train Number"],
        maxLength: [5, "Train Number should not exceed 5 character"],
        minLength: [4, "Train Number should be atleast 4 character"]
    },
    Source: {
        type: String,
        required: [true,"Please Enter Train Source"]
    },
    Destination: {
        type: String,
        required: [true,"Please Enter Train Destination"]
    },
    startTime: {
        type: String,
        required: [true,"Please Enter startTime of train"]
    },
    reachTime: {
        type: String,
        required: [true,"Please Enter reachTime of train"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('train', trainSchema)