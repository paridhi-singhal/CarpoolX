import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

// Sync DB
sequelize.sync({ alter: true }).then(() => {
  console.log("MySQL Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
