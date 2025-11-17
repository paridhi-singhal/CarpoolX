import express from "express";
import { bookRide, getUserBookings ,cancelBooking} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", bookRide);
router.get("/:userId", getUserBookings);
router.put("/cancel/:bookingId", cancelBooking);

export default router;
