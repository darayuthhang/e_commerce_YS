'use strict';
require('dotenv').config();
const profile = require("./controller/profile")
const PORT = 3000;
const express = require('express')
const app = express()
const cors = require('cors');
const {requireAuth} = require("./middleware/auth/auth");


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors({origin: true, credentials: true}));



app.get("/", (req, res) => {
    res.send("home")
})

app.post("/register", async (req, res) => {
    await profile.Register(req, res);
})

app.post('/login', async (req, res) => {
  await profile.Login(req, res);
})
app.post("/token", async (req, res) => {
    await profile.getAccessToken(req, res);
})
app.get("/api/yourstore/home",requireAuth, async (req, res) => {
    await profile.YourStoreHome(req, res);
})
app.delete("/logout", async (req, res) => {
  await profile.Logout(req, res);
})
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

module.exports = app
