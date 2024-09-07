const express = require('express');
const user = require("./userDB")
const jwt = require('jsonwebtoken')
const app = express();
app.post("/signup", (req, res) => {
    const { email, username, password, phone } = req.body
    console.log(username)
})
app.use(express.json())
app.listen(30084,()=>console.log("user Services listening on port 30084"))
