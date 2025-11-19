import { useState } from "react";
import axios from "axios";
import RideCard from "../components/RideCard";
import "./SearchRides.css";
import { use } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const SearchRides = () => {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    date: ""
  });
  const { user } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      
      const res = await API.get("/rides", { params: form });
      setRides(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching rides");
    }
    setLoading(false);
  };

  return (
    <div className="search-rides-container">
      <h2>Search Rides</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          name="source"
          value={form.source}
          onChange={handleChange}
          placeholder="Source"
          required
        />
        <input
          type="text"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading rides...</p>}

      <div className="rides-list">
        {rides.filter((ride) => ride.driverId !== user?.data.id).length === 0 && !loading ? (
          <p>No rides found.</p>
        ) : (
          rides
          .filter((ride)=> ride.driverId !== user?.data.id)
          .map((ride) => <RideCard key={ride.id} ride={ride} />)
        )}
      </div>
    </div>
  );
};

export default SearchRides;
