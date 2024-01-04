const express = require("express")
const router = express.Router();

const {
    getTrains,
    createTrain,
    getTrain,
    deleteTrain,
} = require("../controller/trainController.js");

router.get("/allTrains", getTrains);
router.post("/create", createTrain);
router.get("/:id", getTrain);
router.delete("/delete", deleteTrain);

module.exports = router;