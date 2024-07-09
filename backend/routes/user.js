const express = require("express");
const router = express.Router();

const {
    registerUser,
    getSingleUser,
    getAllUser,
    deleteUser,
    profile,
    loginUser,
    logout,
} = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");


router.post("/create", registerUser);
router.post("/login", loginUser);
router.post("/logout",isAuthenticatedUser, logout);
router.get("/profile",isAuthenticatedUser,  profile);
router.get("/:id",isAuthenticatedUser, getSingleUser);
router.get("/",isAuthenticatedUser, getAllUser);
router.delete("/:id",isAuthenticatedUser,  deleteUser);

module.exports = router;