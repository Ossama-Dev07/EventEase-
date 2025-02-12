const express = require('express');
const cors = require('cors'); 
const User = require("./userDB");
const session = require('express-session');
const Event =require('./eventDB')
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
require('dotenv').config();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
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
  const userexist = await User.findOne({ email: email })
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
////////////////////////////////////////////////////////

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   next();
// });

async function  sendEmail({ recipient_email, OTP }) {
  // const userexist = await User.findOne({ email: recipient_email })
  // if (!userexist) {
  //   return res.status(404).json({data:"email not exist"})
  // }
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD, 
      },
    });
    
    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "Ossama-Dev07 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Ossama-Dev07</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Ossama-Dev07. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Ossama-Dev07</p>
    <hr style="border:none;border-top:1px solid #eee" />
    
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}



app.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
app.post('/reset_password', async (req, res) => {
  try {
    const { email, newpassword } = req.body;

    const hashedPassword = await bcrypt.hash(newpassword, 10);
     updated=await User.updateOne({ email }, { $set: { password: hashedPassword } });

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  next();
});




app.get("/test", (req, res) => {
  console.log('Session created:', req.session.user)
  
  const { id, username,login } = req.session.user;
  res.json({ message: "User authenticated", id, username,login });
});





















app.listen(30084, () => console.log("User Services listening on port 30084"));

