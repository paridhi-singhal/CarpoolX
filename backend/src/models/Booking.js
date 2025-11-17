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

User.hasMany(Booking, { foreignKey: "userId", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "userId" });

Ride.hasMany(Booking, { foreignKey: "rideId", onDelete: "CASCADE" });
Booking.belongsTo(Ride, { foreignKey: "rideId" });

export default Booking;
