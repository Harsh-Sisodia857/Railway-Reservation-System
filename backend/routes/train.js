const express = require("express")
const router = express.Router();

const {
    getTrains,
    postTrain,
    getTrain,
    deleteTrain,
} = require("../controllers/trainController.js");

router.get("/", getTrains);
router.post("/", postTrain);
router.get("/:id", getTrain);
router.delete("/", deleteTrain);

module.exports = router;