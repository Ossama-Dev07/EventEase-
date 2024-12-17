const express = require('express');
const cors = require('cors'); 
const User = require("./userDB");
const session = require('express-session');
const Event =require('./eventDB')
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

app.use(express.json());
//config fot cookies and seesion 
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type','Authorization'],
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
    const { _id: id, role } = userexist;
    req.session.user =  { id, role,login:true };
    res.status(200).json({ message: "Logged in successfully" });
  }
})

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});
////////////////////////User INFORAMTION///////
app.get("/user", async (req, res) => {
  try {
    if (req.session.user === undefined) {
      console.log('User not logged in');
      return res.status(401).json({ error: "User not logged in" });
    }

    console.log('Session user:', req.session.user);
    const { id, login,role } = req.session.user;

    const user = await User.findOne({ _id: id });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user, valid: login,role:role });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: "An error occurred" });
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'uploads/profiles');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `user_${req.session.user.id}_${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });
app.put("/user", upload.single('image'), async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ error: "User not logged in" });
        }

        const { id } = req.session.user;
        const { email, username, phone, password } = req.body;
        let profileImageUrl = null;

        // Check if a file was uploaded
        if (req.file) {
            profileImageUrl = `/uploads/profiles/${req.file.filename}`;
        }

        // Hash the password if provided
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update the user data
        const updatedData = {
            email,
            username,
            phone,
            ...(profileImageUrl && { profileImageUrl }), // Add profileImageUrl if it exists
            ...(hashedPassword && { password: hashedPassword }) // Add password if it exists
        };

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating user data" });
    }
});


app.get("/test", (req, res) => {
  console.log('Session created:', req.session.user)
  
  const { id, username,login } = req.session.user;
  res.json({ message: "User authenticated", id, username,login });
});





















app.listen(30084, () => console.log("User Services listening on port 30084"));

