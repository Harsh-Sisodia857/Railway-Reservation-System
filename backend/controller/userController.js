const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail.js')
const crypto = require("crypto")

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const secPass = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email, password: secPass,
        avatar: {
            public_id: "this is a sample Id",
            url: "profilePicUrl"
        }
    });

    sendToken(user, 201, res);
})

//login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    //checking email and password
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }
    sendToken(user, 200, res);

})

// Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
})

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    // Get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your Password Reset Token is : \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `E-commerce Password Recovery Mail`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        })
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, 500));
    }
})

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256").
        update(req.params.token).
        digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler("Reset Password Token is Invaid or has been expired", 404));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does'nt Match", 400));
    }
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
})

// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
});

// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("password does not match", 400));
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(req.body.newPassword, salt);
    await user.save();

    sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // We will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
});

// Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        role: req.body.role
    };
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: `Role of ${user.name} is Updated to ${req.body.role}`
    });
});

// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});