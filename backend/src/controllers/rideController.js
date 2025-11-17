import Ride from "../models/Ride.js";

export const createRide = async (req, res) => {
  try {
    const { driverId, source, destination, date, time, seatsAvailable, price } = req.body;

    if (!driverId) return res.status(400).json({ message: "Driver ID is required" });

    const ride = await Ride.create({
      driverId,
      source,
      destination,
      date,
      time,
      seatsAvailable,
      price,
    });

    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ message: "Error creating ride", error: err });
  }
};

export const searchRides = async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    const filter = {};
    if (source) filter.source = source;
    if (destination) filter.destination = destination;
    if (date) filter.date = date;

    const rides = await Ride.findAll({ where: filter });

    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: "Error searching rides", error: err });
  }
};
