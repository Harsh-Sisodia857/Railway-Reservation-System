const User = require("../model/userModel");
const ErrorHandler = require("../utils/errroHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser'); 

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    console.log("COOKIE : ",req)
    if (!req.cookies || !req.cookies.token) {
        return next(new ErrorHandler("Please Login to Access this resource",401))
    }
    console.log("isAuthenticatedUser TOKEN : ",req.cookies);
    const { token } = req.cookies;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // saving user's data in req.user. For future accessing the user data
    req.user = await User.findById(decodedData.id)
    console.log("REQ USER : ", req.user);

    next();
})

exports.authorizedRoles = (...roles)=>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to accesss this resource`, 403));
        }
     next();
    }
}