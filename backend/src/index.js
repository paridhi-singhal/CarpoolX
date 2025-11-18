import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import "./models/associations.js";

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

let isSynced = false;

async function initDB() {
  if (!isSynced) {
    await sequelize.sync();
    console.log("DB synced on Vercel");
    isSynced = true;
  }
}

export default async function handler(req, res) {
  await initDB();
  return app(req, res);
}
