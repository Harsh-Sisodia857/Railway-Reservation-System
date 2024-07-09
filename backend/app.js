const express = require("express");
const app = express();
const dotenv = require('dotenv');
const connectTodb = require('./config/database');
const cookieParser = require("cookie-parser");

connectTodb()
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. 
app.use(cookieParser());
app.use(express.json());
app.use('/api', require('./routes/index'))
// Config ---- After setting the path we can use variables from the config.env file
dotenv.config({ path: "backend/config/config.env" });

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is listening at ${port}`);
})