import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import rideRoutes from "./src/routes/rideRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/bookings", bookingRoutes);

sequelize.sync().then(() => {
  console.log("DB synced locally");
  app.listen(5000, () => console.log("Local server running on port 5000"));
});
