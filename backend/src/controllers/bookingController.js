import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";

// Book a ride
export const bookRide = async (req, res) => {
  try {
    const { rideId, userId } = req.body;
    const existing = await Booking.findOne({
      where: { rideId, userId ,status: "booked" }
    }); 
    if (existing) return res.status(400).json({ message: "You have already booked this ride" });

    // check if ride exists
    const ride = await Ride.findByPk(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    if (ride.seatsAvailable <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    const booking = await Booking.create({ rideId, userId ,status: "booked",});

    // Decrease seats
    ride.seatsAvailable -= 1;
    await ride.save();
    const bookingWithRide = await Booking.findByPk(booking.id, { include: [Ride] });
    res.status(201).json(bookingWithRide);
  } catch (err) {
    res.status(500).json({ message: "Error booking ride", error: err });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.findAll({
      where: { userId },
      include: [Ride], // joins ride details
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err });
  }
};
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.bookingId, { include: [Ride] });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only booked rides can be cancelled
    if (booking.status !== "booked")
      return res.status(400).json({ message: "Cannot cancel this booking" });

    // Update booking status
    booking.status = "cancelled";
    await booking.save();

    // Restore seat to the ride
    const ride = await Ride.findByPk(booking.rideId);
    ride.seatsAvailable += 1;
    await ride.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking", error: err });
  }
};
