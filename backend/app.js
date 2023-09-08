const express = require("express");
const app = express();
const dotenv = require('dotenv');
const connectTodb = require('./config/database')
connectTodb()
app.use(express.json());
app.use('/api', require('./routes/index'))
// Config ---- After setting the path we can use variables from the config.env file
dotenv.config({ path: "backend/config/config.env" })

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is listening at ${process.env.PORT}`);
})