import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Ride = sequelize.define("Ride", {
  id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
  source: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  seatsAvailable: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});


export default Ride;
