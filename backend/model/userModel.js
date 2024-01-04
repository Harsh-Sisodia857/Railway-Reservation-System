const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const validator = require("validator");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [50, "Name cannot exceed 50 characters"],
        minLength: [3, "Name should have atleast 3 Character"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [3, "Name should have atleast 3 Character"],
        select: false
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: {
        type : String,
        default : ""
    },
    resetPasswordExpire: Date,
}, {
    timestamps: true
});

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

module.exports = mongoose.model("user", userSchema)