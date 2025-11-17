import express from "express";
import { createRide, searchRides } from "../controllers/rideController.js";


const router = express.Router();

router.post("/", createRide);
router.get("/", searchRides);

export default router;
