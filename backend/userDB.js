const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/Authentification", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connection"))
  .catch(() => console.log("Connection failed"));

const AuthentificationSchema = mongoose.Schema({
  _id: Number, 
  email: { type: String, required: true },
  username: String,
  password: String,
  role: { type: String, default: "user" },
  phone:String,
  creatAt:{type:Date,default:Date.now()}
}, { versionKey: false }); 

const user = mongoose.model("user", AuthentificationSchema);

module.exports = user;