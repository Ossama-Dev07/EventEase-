const express = require('express');
const cors = require('cors'); 
const User = require("./userDB");
const jwt = require('jsonwebtoken');
const app = express();
const auth = require('./middleware/authentifiction')
const bcrypt=require('bcrypt');


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post("/signup", async (req, res) => {
    try{
    const { email, username, password, phone } = req.body;
    const existemail=await User.findOne({email:email})
    const existusername =await User.findOne({ username: username })
    if (existemail || existusername) {
        res.json({error:"email or name is already exist"})
    } else {
        const hashedPassword= await bcrypt.hash(password,10)
        const user = new User({email, username, password: hashedPassword , phone})
        user.save()
        .then(()=>res.json("success"))
        }
    }
    catch {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
    
});

app.listen(30084, () => console.log("User Services listening on port 30084"));

