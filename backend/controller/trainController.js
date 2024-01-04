const train = require("../model/trainModel");

// GETTING ALL TRAINS
const getTrains = async (req, res) => {
    await train
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


    const Train = await train.findOne({ trainName });

    if (Train)
        return res.json({ msg: "Train with same name already exists" });

    // add new train
    const newTrain = await new train({
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

    const Train = await train.findOne({ _id: id });
    if (!Train) return res.json({ message: "Train Does not exist" });

    return res.json({
        success: true,
        train: {
            id: Train._id,
            name: Train.trainName,
            TrainNumber: Train.trainNumber,
            Destination: Train.Destination,
            Source: Train.Source,
            startTime: Train.startTime,
            reachTime: Train.reachTime,
        }
    });
};

// deletes a train
const deleteTrain = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "id not found" });

    const Train = await train.findOne({
        _id: id,
    });

    if (!Train) return res.json({ message: "Train does not exists" });
    await Train.deleteOne().then((train) =>
        res.json({
            success: true,
            train,
        })
    ).catch((err) => console.log(err));
};

module.exports = { getTrains, createTrain, getTrain, deleteTrain };