import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Ride = sequelize.define("Ride", {
  source: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  seatsAvailable: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

User.hasMany(Ride, { foreignKey: "driverId" });
Ride.belongsTo(User, { foreignKey: "driverId" });

export default Ride;
