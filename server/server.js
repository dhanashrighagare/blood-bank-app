const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const sendMail = require("./controllers/sendMail");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express
const app = express();
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/donors", require("./routes/donorRoutes"));
app.use("/api/v1/blood-requests", require("./routes/bloodRequestRoutes"));
app.use("/api/v1/blood", require("./routes/bloodRoutes")); // Add Blood to Inventory 
app.use("/api/v1/appointments", require("./routes/appointmentRoutes"));
app.use('/api/v1/notifications', require('./routes/notificationRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1', require('./routes/emailRoutes'));

// Root route
app.get("/", (req, res) => {
  res.send("I am a server");
});

// Mail route
app.get("/mail", sendMail);

// Port configuration
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${PORT}`
      .bgBlue.white
  );
});
