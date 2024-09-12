const express = require('express');
const cors = require('cors'); 
const User = require("./userDB");
const session = require('express-session');

const app = express();

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

app.use(express.json());
//config fot cookies and seesion 
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge:1000*60*60*24
    }
}))


//API for LOGIN and SIGNUP 
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
app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    const userexist =await User.findOne({ email: email })
    if (!userexist) {
        return res.status(404).json({message:"user not exist"})
    }
    const isPasswordValid = await bcrypt.compare(password, userexist.password)
    if (!isPasswordValid) {
        res.status(404).json({ message:"Invalid password" })
    } else {
        const { _id: id, username } = userexist;
    req.session.user = { id, username,login:true };
    res.status(200).json({ message: "Logged in successfully" });
    }
})
app.get("/test", (req, res) => {
  console.log('Session created:', req.session.user)

  const { id, username,login } = req.session.user;
  res.json({ message: "User authenticated", id, username,login });
});
app.get("/user", async (req, res) => {
    if (req.session.user === undefined) {
        console.log('in', req.session.user)
        return console.log("sir di login")
    }
    console.log('out', req.session.user)
    const { id, login } = await req.session.user;
    const user = User.findOne({ _id:id })
    .then((user) => res.status(200).json({ user: user, valid: login }))
  .catch(() => {
    res.status(500).json({ error: "An error occurred" });
  });
})


app.listen(30084, () => console.log("User Services listening on port 30084"));

