import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./CreateRide.css";

const CreateRide = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    seatsAvailable: "",
    price: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/rides", {
      driverId: user.data.id, 
      source: form.source,
      destination: form.destination,
      date: form.date,
      time: form.time,
      seatsAvailable: form.seatsAvailable,
      price: form.price,
    });
    //alert("Ride created successfully!");
    setError("Ride created successfully!");
    setTimeout(() => { setError(null); }, 3000);
  } catch (err) {
    console.error(err);  // check err.response.data for the actual backend message
  }
};

  return (
    <div className="create-ride-container">
              {error && (
        <div className="error-message-container">
          <p className="error-text">{error}</p>
        </div>
      )}
      <h2>Create a New Ride</h2>
      <form className="create-ride-form" onSubmit={handleSubmit}>
        <input
          name="source"
          value={form.source}
          onChange={handleChange}
          placeholder="Source"
          required
        />
        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <input
          name="seatsAvailable"
          type="number"
          min="1"
          value={form.seatsAvailable}
          onChange={handleChange}
          placeholder="Seats Available"
          required
        />
        <input
          name="price"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          required
        />
        <button type="submit">Create Ride</button>
      </form>
    </div>
  );
};

export default CreateRide;
