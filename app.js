require("dotenv").config();

const cors = require("cors");

const mongoose = require('mongoose');
mongoose.connect(process.env.URL).then(() => {
console.log("working");
}).catch(() => {
    console.log("error");
});

const express = require('express');

const app = express();

const userRouter = require('./routes/userRoutes.js');
const notesRouter = require('./routes/notesRoutes');

app.use(cors());
app.use(express.json());

app.use('/user',userRouter);
app.use('/notes',notesRouter);

const port = process.env.PORT||8000;
app.listen(port,() => {
    console.log(`port working at ${port} `);
});
