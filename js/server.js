require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// ✅ Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Create Schema & Model
const ContactSchema = new mongoose.Schema({
    inquiry: String,
    createdAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
    name: String,
    budget: String,
    occasion: String,
    preferences: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);
const Order = mongoose.model("Order", OrderSchema);

// ✅ Contact Form Route
app.post("/contact", async (req, res) => {
    try {
        const newInquiry = new Contact(req.body);
        await newInquiry.save();
        res.status(201).json({ message: "Contact inquiry saved!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving contact inquiry" });
    }
});

// // ✅ Custom Orders Route
// app.post("/custom", async (req, res) => {
//     try {
//         const newOrder = new Order(req.body);
//         await newOrder.save();
//         res.status(201).json({ message: "Order submitted successfully!" });
//     } catch (error) {
//         res.status(500).json({ error: "Error saving custom order" });
//     }
// });

// ✅ Custom Orders Route
app.post("/custom", async (req, res) => {
    try {
        console.log("📦 Received data at /custom:", req.body); // 👈 Step 1: Log incoming data

        const newOrder = new Order(req.body);
        await newOrder.save(); // 👈 Step 2: Save to DB

        res.status(201).json({ message: "Order submitted successfully!" });
    } catch (error) {
        console.error("❌ Error in /custom route:", error); // 👈 Step 3: Show the exact error
        res.status(500).json({ error: "Error saving custom order" });
    }
});


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Admin - Get all orders
app.get("/admin/orders", async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });
  
  // ✅ Admin - Get all contact inquiries
  app.get("/admin/contacts", async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });
  