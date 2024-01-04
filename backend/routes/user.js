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


router.post("/create", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/:id", getSingleUser);
router.get("/", getAllUser);
router.delete("/:id",  deleteUser);
router.get("/me",  profile);

module.exports = router;