const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: "backend/config/config.env" })

const port = process.env.PORT || 3000;
const connectDatabase = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://0.0.0.0:27017/RailwayReservationSystem", { useUnifiedTopology: true }).then((data) => {
        console.log(`MongoDb connected with Server : ${port}`);
    })
}

module.exports = connectDatabase