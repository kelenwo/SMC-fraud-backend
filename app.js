const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const database = process.env.MONGO_URL;

const app = express();
const port = 3300;

mongoose.connect(database)
    .then(() => console.log('db connected!'))
    .catch(err => console.log(err));

app.use(express.json());

//Routes
app.use('/', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
