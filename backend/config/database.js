const mongoose = require('mongoose');
const connectDatabase = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://0.0.0.0:27017/RailwayReservationSystem", { useUnifiedTopology: true }).then((data) => {
        console.log(`MongoDb connected with Server : ${process.env.PORT}`);
    })
}

module.exports = connectDatabase