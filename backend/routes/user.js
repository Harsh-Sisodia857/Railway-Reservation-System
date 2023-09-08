const express = require("express");
const router = express.Router();

const {
    createUser,
    getUser,
    getAllUsers,
    deleteUser,
    profile,
} = require("../controller/userController");


router.post("/", createUser);
router.get("/:id",  getUser);
router.get("/",  getAllUsers);
router.delete("/:id",  deleteUser);
router.get("/me",  profile);

module.exports = router;