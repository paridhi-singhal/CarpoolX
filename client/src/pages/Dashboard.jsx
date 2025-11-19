import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import RideCard from "../components/RideCard";
import "./Dashboard.css";
import "../components/RideCard.css";
import API from "../services/api";

const Dashboard = () => {
  const [rides, setRides] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null); 
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // fetch all rides
    const fetchRides = async () => {
      try {
        const res = await API.get("/rides");
        setRides(res.data);
      } catch (err) {
        setError("Failed to fetch rides");
        setTimeout(() => setError(null), 5000);
        console.error("Error fetching rides", err);
      }
    };

    // fetch user bookings
    const fetchBookings = async () => {
      try {
        const res = await API.get(`/bookings/${user.data.id}`);
        setBookings(res.data);
      } catch (err) {
        setError("Failed to fetch bookings");
        setTimeout(() => setError(null), 5000);
        console.error("Error fetching bookings", err);
      }
    };

    fetchRides();
    fetchBookings();
  }, [user]);

  // upcoming and past bookings
  const upcoming = bookings.filter((b) => b.status === "booked");
  const past = bookings.filter((b) => b.status === "completed" || b.status === "cancelled");

  // available rides (not created by user)
  const availableRides = rides.filter((r) => r.driverId !== user.data.id && r.seatsAvailable > 0);
  const handleBooking = (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);
    // Optionally, decrease seat count in rides state
    setRides((prev) =>
      prev.map((r) =>
        r.id === newBooking.rideId
          ? { ...r, seatsAvailable: r.seatsAvailable - 1 }
          : r
      )
    );
  };
  // cancel booking
  const handleCancel = async (bookingId) => {
    try {
      await API.put(`/bookings/cancel/${bookingId}`);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (err) {
      setError("Failed to cancel booking");
      setTimeout(() => setError(null), 5000);
      console.error("Error cancelling booking", err);
    }
  };

  return (
    <div className="dashboard-container">
        {error && (
        <div className="error-message-container">
          <p className="error-text">❌ {error}</p>
        </div>
      )}
      <h2>Dashboard</h2>
      <p>Welcome, {user?.data.name}!</p>

      {/* Available Rides */}
      <div className="section">
        <h3>🚗 Available Rides</h3>
        {availableRides.length === 0 ? (
          <p>No rides available.</p>
        ) : (
          <div className="cards-container">
            {availableRides.map((ride) => <RideCard key={ride.id} ride={ride} user={user} onBooked= {handleBooking} />)}
          </div>
        )}
      </div>

      {/* Upcoming Bookings */}
      <div className="section">
        <h3>📅 Upcoming Rides</h3>
        {upcoming.length === 0 ? (
          <p>No upcoming rides booked.</p>
        ) : (
          <div className="cards-container">
            {upcoming.map((b) => (
              <div key={b.id} className="booking-card">
                <strong>{b.Ride.source} → {b.Ride.destination}</strong><br />
                Date: {b.Ride.date} | Time: {b.Ride.time} <br />
                Status: {b.status} <br />
                <button onClick={() => handleCancel(b.id)} className="cancel-btn">
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Bookings */}
      <div className="section">
        <h3>📜 Past Rides</h3>
        {past.length === 0 ? (
          <p>No past rides.</p>
        ) : (
          <div className="cards-container">
          {past.map((b) => (
            <div
              key={b.id}
              className={`booking-card ${b.status === "cancelled" ? "cancelled" : "past"}`}
            >
              <strong>{b.Ride.source} → {b.Ride.destination}</strong><br />
              Date: {b.Ride.date} | Time: {b.Ride.time} <br />
              Status: {b.status}
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
