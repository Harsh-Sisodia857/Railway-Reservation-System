const Train = require("../model/trainModel");

// GETTING ALL TRAINS
const getTrains = async (req, res) => {
    await Train
        .find({})
        .sort({ trainName: 1 })
        .then((trains) => {
            return res.status(200).json({
                success: true,
                trains,
            });
        })
        .catch((err) => console.log(err));
};

// creating new train
const createTrain = async (req, res) => {
    const {
        trainName,
        trainNumber,
        Destination,
        Source,
        startTime,
        reachTime
    } = req.body;


    const train = await Train.findOne({ trainName });

    if (train)
        return res.json({ msg: "Train with same name already exists" });

    // add new train
    const newTrain = await new Train({
        trainName,
        trainNumber,
        Destination,
        Source,
        startTime,
        reachTime,
    });

    newTrain.save().then((train) => {
        return res.status(200).json({
            success: true,
            train: {
                trainName: train.trainName,
                Destination: train.Destination,
                Source: train.Source,
                startTime: train.startTime,
                reachTime: train.reachTime
            },
        });
    }).catch((err) => console.log(err));
};

// returns a single train based on id
const getTrain = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id not found in params" });

    const train = await Train.findOne({ _id: id });
    if (!train) return res.json({ message: "Train Does not exist" });

    return res.json({
        success: true,
        train: {
            id: train._id,
            name: train.trainName,
            TrainNumber: train.trainNumber,
            Destination: train.Destination,
            Source: train.Source,
            startTime: train.startTime,
            reachTime: train.reachTime,
        }
    });
};

// deletes a train
const deleteTrain = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id not found" });

    const train = await Train.findOne({
        _id: id,
    });

    if (!train) return res.json({ message: "Train does not exists" });
    await train.deleteOne().then((train) =>
        res.json({
            success: true,
            message:"Train Deleted Successfully",
            train,
        })
    ).catch((err) => console.log(err));
};

module.exports = { getTrains, createTrain, getTrain, deleteTrain };