const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/Authentification", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Event Database connection"))
  .catch(() => console.log("Event Database connection failed"));

const EventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
  description: String,
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
  location: String,
  category: { type: String, enum: ['Music', 'Business', 'Sports', 'Education', 'Other'] }, 
  availableSeats: { type: Number, required: true },
  reservedSeats: { type: Number, default: 0 },
  pricing: {
    free: { type: Number, default: 0 },  
    VIP: { type: Number, required: true },  
    paid: { type: Number, required: true }  
  },
  createdBy: { type: String, required: true },  
  reservations: [
    {
      userId: { type: String, required: true },  
      seatsReserved: { type: Number, required: true },
      totalPrice: Number,
      type: { type: String, enum: ['free', 'VIP', 'paid'], required: true },
      totalPrice: Number,  
      reservationDate: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false }); 

const event = mongoose.model("Event", EventSchema);

module.exports = event;