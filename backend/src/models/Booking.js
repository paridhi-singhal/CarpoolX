import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Ride from "./Ride.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("booked", "completed", "cancelled"),
      defaultValue: "booked",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Booking;
