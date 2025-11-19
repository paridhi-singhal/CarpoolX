import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./RideCard.css";
import API from "../services/api";

const RideCard = ({ ride ,onBooked}) => {
  const { user } = useAuth();

  const handleBooking = async () => {
    try {
      const res = await API.post("/bookings", {
        rideId: ride.id,
        userId: user.data.id,
      });
      //alert("Ride booked successfully!");
      onBooked(res.data); 
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message); 
      }else{  
      alert("Error booking ride.");
    }
    }
  };

  return (
    <div className="ride-card">
      <h4>{ride.source} → {ride.destination}</h4>
      <p>Date: {ride.date} | Time: {ride.time}</p>
      <p>Seats: {ride.seatsAvailable} | Price: ₹{ride.price}</p>
      <button onClick={handleBooking} disabled={ride.seatsAvailable <= 0}>
        {ride.seatsAvailable > 0 ? "Book Ride" : "Full"}
      </button>
    </div>
  );
};

export default RideCard;
