'use strict';
require('dotenv').config();
const profile = require("./controller/profile")

const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 3000;
app.use(express.json());
app.use(cors({origin: true, credentials: true}));


app.get("/", (req, res) => {
    res.send("home")
})

app.post("/register", async (req, res) => {
    await profile.Register(req, res);
})


app.listen(PORT);
